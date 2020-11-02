```
http{
    proxy_cache_path d:/data/ngx_cache/cache1 levels=1:2 keys_zone=cache1:100m inactive=1d max_size=10g;
}

#d:/data/...　　缓存存放路径

#levels=1:2 　　缓存一级目录是 1 个字符，二级目录 2 个字符

#keys_zone=cache1:100m 　　这个 zone 的名字叫 cache1，分配 100m 内存

#inactive=1d 　　缓存的文件一天没被访问就会被删掉

#max_size=10g 　　这个 zone 的硬盘容量为 10g
```

```
location{
    #设置资源缓存的zone
    proxy_cache cache1;

    #强制缓存，忽视后端服务器的 no-cache 等因素
    proxy_ignore_headers X-Accel-Expires Expires Cache-Control Set-Cookie;

    #设置缓存的key
    proxy_cache_key $host$uri$is_args$args;

    #设置状态码为200和304的响应可以进行缓存，并且缓存时间为30分钟　
    proxy_cache_valid 200 304 30m;

    #客户端缓存, 如果在Cache-Control响应头设置了 "max-age" 或者 "s-max-age" 指令，那么 Expires 头会被忽略
    #expires 1d;

    #响应头添加 命中状态
    add_header X-Cache $upstream_cache_status;　　
```

缓存有优先级

实验 1：比较 inactive 和 proxy_cache_valid 的优先级

```
1.设置 inactive 20s , proxy_cache_valid 80s

n 秒后再次访问 | 是否命中

10 　　 hit
50 　　 hit
90 　　 expired

这里可以看出 inactive 并未起作用；

2.设置 inactive 80s , proxy_cache_valid 20s

n 秒后再次访问 | 是否命中

10 　　 hit
30 　　 expired

同样的这里 inactive 没有作用

结论：proxy_cache_valid 优先级高于 inactive
```
