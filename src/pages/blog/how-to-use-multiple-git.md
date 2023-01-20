---
layout: '../../layouts/BlogPost.astro'
title: 'How to use multiple git account on the same machine'
description: 'This method will automatically choose git account to use base on work directory. You can add many git account as you want.'
pubDate: 2023-01-11 11:39:00 +0700
updatedDate: 2023-01-20 19:55:00 +0700
tags:
    - programming
    - en
---
This method will automatically choose git account to use base on work directory. You can add many git account as you want.

### Related files
All files we gonna make change to
- ~/.ssh/config
- ~/.gitconfig
- ~/workspace/work/.gitconfig
- ~/workspace/personal/.gitconfig

## Create ssh key for each account
Follow steps from github [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).  
Please name you key differently for each account. e.g.  `~/.ssh/id_ed25519-personal`, `~/.ssh/id_ed25519-work`  

## Config ssh key for each account
In `~/.ssh/config` config it like this. Use different identity file for different host. You can name your host anything, we will use it in the next step.
```ssh-config
# Personal GitHub
Host github-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519-personal
    IdentitiesOnly yes

# Work GitHub
Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519-work
    IdentitiesOnly yes

Host *
    AddKeysToAgent yes
    UseKeychain yes
```

## Config git config
We gonna make git agent know when to use which account base on workspace.  
If we are in `~/workspace/work`, it will use `~/workspace/work/.gitconfig`  
If we are in `~/workspace/personal`, it will use `~/workspace/personal/.gitconfig`    

Edit your `~/.gitconfig`
```ini
[includeIf "gitdir/i:~/workspace/work/"]
    path = ~/workspace/work/.gitconfig

[includeIf "gitdir/i:~/workspace/personal/"]
    path = ~/workspace/personal/.gitconfig
```

includeIf part tells git agent to include .gitconfig in the specify path if we are in the specify gitdir.  In this example, it means if you are working on any repository inside `~/workspace/work` directory, gitconfig from `~/workspace/work/.gitconfig` will be included.

## Config gitconfig for each account
In `~/workspace/work/.gitconfig` and `~/workspace/personal/.gitconfig`, config based on git account sits here. We will config email/name and rewrite github host here.
```ini
[user]
    email = your-email@gmail.com
    name = git-username

[url "git@github-personal"]
    insteadOf = git@github.com
```

## Check
Go to any git repository in your work workspace and your personal workspace. Run this command. You should see your configured username correctly.
```shell
git config --get-all user.name
```

## Ref
https://gist.github.com/rahularity/86da20fe3858e6b311de068201d279e3
https://stackoverflow.com/questions/4665337/git-pushing-to-remote-github-repository-as-wrong-user/12438179#12438179
https://gist.github.com/jexchan/2351996