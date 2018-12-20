# 设置基础镜像 使用最新镜像构建
FROM nginx
# 定义作者
MAINTAINER geng
# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
COPY dist/  /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf