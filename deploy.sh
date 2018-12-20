#!/bin/bash

set -e
IMAGE_REPOSITORY="docker-vue"

# 获取当前执行脚本的绝对路径
# filepath=$(cd "$(dirname "$0")"; pwd)  

#1. 安装node_modules
echo "start npm install"
npm install

#2. 编译打包
echo "npm run build"
npm run build

#3. 停止旧容器，并且删除
# echo "stop and rm old ${IMAGE_REPOSITORY}:0.0.1"
# docker stop ${IMAGE_REPOSITORY}:0.0.1
# docker rm -f ${IMAGE_REPOSITORY}:0.0.1 || true

#4.重新构造镜像
# 注意最后有个点，代表使用当前路径的 Dockerfile 进行构建
echo "start docker build"
docker build -t ${IMAGE_REPOSITORY}:0.0.1 .

#5 运行docker 容器,删除旧打包文件
# docker run ${IMAGE_REPOSITORY}:0.0.1

