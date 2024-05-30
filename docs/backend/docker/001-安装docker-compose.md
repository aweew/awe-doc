# 安装docker-compose

## 安装Docker

### 安装yum-utils
```shell
yum install -y yum-utils
```

### 添加docker仓库
```shell
yum-config-manager     --add-repo     https://download.docker.com/linux/centos/docker-ce.repo
```

### 安装docker
```shell
yum install -y docker-ce docker-ce-cli containerd.io
```

### 启动docker
```shell
systemctl start docker
```

### 检查并启动docker服务
```shell
systemctl is-enabled docker.service
systemctl enable docker.service
```

## 安装docker-compose

### 下载docker-compose
```shell
mv docker-compose-linux-x86_64 /usr/local/bin/docker-compose
```

### 添加执行权限
```shell
chmod +x /usr/local/bin/docker-compose
```

### 创建软链接
```shell
ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

### 检查是否安装成功
```shell
docker-compose version
```