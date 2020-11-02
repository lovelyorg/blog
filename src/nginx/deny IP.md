方式 1:

直接写在 http 模块内

```
http{
    deny 192.168.1.155;
    deny x.x.x.x;
}
```

方式 2:

创建一个配置文件例如 forbiddenIP.conf, 然后引入

```
forbiddenIP.conf 内容如下:

deny 192.168.1.155;
deny x.x.x.x;
```

```
http{
    include forbiddenIP.conf;
```

最后, 重启 nginx 生效
