[简易指南](http://www.bootcss.com/p/git-guide/index.html)

[详细指南 Git Book](https://book.git-scm.com/book/zh/v2)

[Reference](https://book.git-scm.com/docs)

### 新电脑设置 ssh

```
1.查看 c:/user/user/.ssh 文件夹下有无 id_rsa , id_rsa.pub 这两个文件

2.如果没有使用以下命令创建
    ssh-keygen -o

3.打开 github 网站, 找到 settings -> new ssh key, 添加 id_rsa.pub 文件的内容

4.查看是否配置成功
　　ssh -T git@github.com
```

### 常用命令

```
克隆仓库
git clone xxx

查看状态
git status

拉取&合并远程分支
git pull <remote> <branch>      示例: git pull origin master

工作区 -> 暂存区
git add <file>      单个        git add <file> 亦用于标记冲突已解决
git add -A          all

撤销暂存
git reset HEAD <file>

放弃工作区文件修改
git checkout -- <file>      单个
git checkout .              所有

暂存区 -> HEAD
git commit -m <remark>

撤销 commit
git reset --soft HEAD^

撤销 n 次 commit
git reset --soft HEAD~n

撤销 commit 并撤销 git add
git reset HEAD^
等同于
git reset --mixed HEAD^

撤销 commit 并删除工作区改动
git reset --hard HEAD^  !!! 危险

修改 commit 注释
git commit --amend

推送到远程仓库
git push <remote> <branch>

创建分支
git branch <name>

切换分支
git checkout <branch>

创建分支并切换到该分支
git checkout -b <name>

合并分支 fixbug 到主分支 master
1. git checkout master
2. git merge fixbug

删除分支
git branch -d <branch>
```
