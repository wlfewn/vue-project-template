#!/bin/bash

set -e
IMAGE_NAME="docker-vue:0.0.1"

# 获取当前执行脚本的绝对路径
# filepath=$(cd "$(dirname "$0")"; pwd)  

# 返回上一级目录,进行打包与安装
cd ..

# 1. 安装node_modules
echo "start npm install"
npm install

# 2. 编译打包
echo "npm run build"
npm run build

# 3. 停止旧容器，并且删除

matchingStarted=$(docker ps --filter="name=${IMAGE_NAME}")

# 125 是为空时输出的内容长度
if [ ${#matchingStarted} -gt 125 ]; then
    echo "stop and rm old ${IMAGE_NAME}"
    docker stop ${IMAGE_NAME}
    docker rm ${IMAGE_NAME}
fi

# 4.重新构造镜像
# 注意最后有个点，代表使用当前路径的 Dockerfile 进行构建
echo "start docker build"
docker build -t ${IMAGE_NAME} .

# 5. 运行docker 容器,删除旧打包文件
# 使用-p指定宿主机具体的8080端口映射到容器内部的80端口上了，访问http://localhost/8080即可
docker run -d -p 8080:80 ${IMAGE_NAME} 
