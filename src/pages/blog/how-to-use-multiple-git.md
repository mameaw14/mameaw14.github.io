---
layout: '../../layouts/BlogPost.astro'
title: 'How to use multiple git accounts on the same machine'
description: 'This method will automatically choose a git account to use based on work directory. You can add as many git accounts as you want.'
pubDate: 2023-01-11 11:39:00 +0700
updatedDate: 2023-01-22 03:48:00 +0700
tags:
  - coding
  - en
---

This method will automatically choose a git account to use based on work directory. You can add as many git accounts as you want.

### Related files

All files we gonna make change to

- ~/.ssh/config
- ~/.gitconfig
- ~/workspace/work/.gitconfig
- ~/workspace/personal/.gitconfig

## Create ssh keys

Follow steps from github [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).  
Please name your keys differently for each account. e.g. `~/.ssh/id_ed25519-personal`, `~/.ssh/id_ed25519-work`

## Config ssh keys

In `~/.ssh/config` config it like this. Use different identity file for different host. You can name your host anything; we will use it in the next step.

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

## Config global gitconfig

We gonna make git agent know when to use which account based on workspace.  
If we are in `~/workspace/work`, it will use `~/workspace/work/.gitconfig`  
If we are in `~/workspace/personal`, it will use `~/workspace/personal/.gitconfig`

Edit your `~/.gitconfig`

```ini
[includeIf "gitdir/i:~/workspace/work/"]
    path = ~/workspace/work/.gitconfig

[includeIf "gitdir/i:~/workspace/personal/"]
    path = ~/workspace/personal/.gitconfig
```

includeIf tells git agent to include .gitconfig in the specified path if we are in the specified gitdir.

## Config gitconfig for each account

In `~/workspace/work/.gitconfig` and `~/workspace/personal/.gitconfig`, config based on a git account sits here. We will config email/name and rewrite github host here.

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

## References

1. https://gist.github.com/rahularity/86da20fe3858e6b311de068201d279e3
2. https://stackoverflow.com/questions/4665337/git-pushing-to-remote-github-repository-as-wrong-user/12438179#12438179
3. https://gist.github.com/jexchan/2351996
