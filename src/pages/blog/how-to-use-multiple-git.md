---
layout: ../../layouts/BlogPost.astro
title: "How to use multiple git accounts on the same machine"
date: 2023-01-11T04:39:00
updated: 2023-09-17T00:20:36
slug: "how-to-use-multiple-git"
categories: ["tech"]
tags: ["coding", "en"]
heroImage: ""
---

<div class="wp-block-jetpack-markdown"><p>This method will automatically choose a git account to use based on the work directory. You can add as many git accounts as you want.</p>
<h2>1. Create SSH keys</h2>
<p>Follow steps from GitHub <a href="https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent">here</a>.</p>
<ul>
<li>Please name your keys differently for each account. e.g. <code>~/.ssh/id_ed25519_personal</code>, <code>~/.ssh/id_ed25519_work</code></li>
<li>Skip editing <code>~/.ssh/config</code> part, because we gonna specify which key to use using git config</li>
<li>Need to add identity to keychain</li>
</ul>
</div>



<div class="wp-block-kevinbatdorf-code-block-pro" data-code-block-pro-font-family="Code-Pro-JetBrains-Mono" style="font-size:.875rem;font-family:Code-Pro-JetBrains-Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;line-height:1.5rem;--cbp-tab-width:2;tab-size:var(--cbp-tab-width, 2)"><span role="button" tabindex="0" data-code="# Generate a key, don't forget to rename the file
ssh-keygen -t ed25519 -C &quot;your_email@example.com&quot;

# Add key to keychain
ssh-add --apple-use-keychain ~/.ssh/id_ed25519" style="color:#f6f6f4;display:none" aria-label="Copy" class="code-block-pro-copy-button"><svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path class="with-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path><path class="without-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg></span><pre class="shiki dracula-soft" style="background-color: #282A36" tabindex="0"><code><span class="line"><span style="color: #7B7F8B"># Generate a key, don&#39;t forget to rename the file</span></span>
<span class="line"><span style="color: #F6F6F4">ssh-keygen -t ed25519 -C </span><span style="color: #DEE492">&quot;</span><span style="color: #E7EE98">your_email@example.com</span><span style="color: #DEE492">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #7B7F8B"># Add key to keychain</span></span>
<span class="line"><span style="color: #F6F6F4">ssh-add --apple-use-keychain ~/.ssh/id_ed25519</span></span></code></pre></div>



<div class="wp-block-jetpack-markdown"><h2>2. Separate your git repositories into directories</h2>
<p>E.g. <code>~/workspace/work/</code>, <code>~/workspace/personal/</code></p>
<h2>3. Config global gitconfig</h2>
<p>Edit your <code>~/.gitconfig</code> as example</p>
<p>includeIf tells git agent to include gitconfig from specified path if we are in the specified gitdir</p>
<p>* trailing backslash is important, don’t drop it<br>
* <code>/i</code> in <code>gitdir/i</code> is for insensitive<br>
* path is relative to root directory</p>
</div>



<div class="wp-block-kevinbatdorf-code-block-pro" data-code-block-pro-font-family="Code-Pro-JetBrains-Mono" style="font-size:.875rem;font-family:Code-Pro-JetBrains-Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;line-height:1.5rem;--cbp-tab-width:2;tab-size:var(--cbp-tab-width, 2)"><span role="button" tabindex="0" data-code="[includeIf &quot;gitdir/i:~/workspace/work/&quot;]
    path = .gitconfig-work

[includeIf &quot;gitdir/i:~/workspace/personal/&quot;]
    path = .gitconfig-personal" style="color:#f6f6f4;display:none" aria-label="Copy" class="code-block-pro-copy-button"><svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path class="with-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path><path class="without-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg></span><pre class="shiki dracula-soft" style="background-color: #282A36" tabindex="0"><code><span class="line"><span style="color: #F6F6F4">[includeIf &quot;gitdir/i:~/workspace/work/&quot;]</span></span>
<span class="line"><span style="color: #F6F6F4">    </span><span style="color: #F286C4">path</span><span style="color: #F6F6F4"> </span><span style="color: #F286C4">=</span><span style="color: #F6F6F4"> .gitconfig-work</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F6F6F4">[includeIf &quot;gitdir/i:~/workspace/personal/&quot;]</span></span>
<span class="line"><span style="color: #F6F6F4">    </span><span style="color: #F286C4">path</span><span style="color: #F6F6F4"> </span><span style="color: #F286C4">=</span><span style="color: #F6F6F4"> .gitconfig-personal</span></span></code></pre></div>



<div class="wp-block-jetpack-markdown"><h2>4. Config gitconfig for each account</h2>
<p>In <code>~/.gitconfig-work</code> and <code>~.gitconfig-personal</code>, configure based on the account. Let’s configure email, name, and ssh identity here</p>
</div>



<div class="wp-block-kevinbatdorf-code-block-pro" data-code-block-pro-font-family="Code-Pro-JetBrains-Mono" style="font-size:.875rem;font-family:Code-Pro-JetBrains-Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;line-height:1.5rem;--cbp-tab-width:2;tab-size:var(--cbp-tab-width, 2)"><span role="button" tabindex="0" data-code="[user]
    email = your-email@work.com
    name = Firstname Lastname
[core]
    sshCommand = &quot;ssh -i ~/.ssh/id_ed25519_work&quot;" style="color:#f6f6f4;display:none" aria-label="Copy" class="code-block-pro-copy-button"><svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path class="with-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path><path class="without-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg></span><pre class="shiki dracula-soft" style="background-color: #282A36" tabindex="0"><code><span class="line"><span style="color: #F6F6F4">[user]</span></span>
<span class="line"><span style="color: #F6F6F4">    </span><span style="color: #F286C4">email</span><span style="color: #F6F6F4"> </span><span style="color: #F286C4">=</span><span style="color: #F6F6F4"> your-email@work.com</span></span>
<span class="line"><span style="color: #F6F6F4">    </span><span style="color: #F286C4">name</span><span style="color: #F6F6F4"> </span><span style="color: #F286C4">=</span><span style="color: #F6F6F4"> Firstname Lastname</span></span>
<span class="line"><span style="color: #F6F6F4">[core]</span></span>
<span class="line"><span style="color: #F6F6F4">    </span><span style="color: #F286C4">sshCommand</span><span style="color: #F6F6F4"> </span><span style="color: #F286C4">=</span><span style="color: #F6F6F4"> </span><span style="color: #DEE492">&quot;</span><span style="color: #E7EE98">ssh -i ~/.ssh/id_ed25519_work</span><span style="color: #DEE492">&quot;</span></span></code></pre></div>



<div class="wp-block-jetpack-markdown"><p>This means when you run any git command, git will use <code>ssh -i/.ssh...</code> instead of <code>ssh</code> command</p>
<p><strong>You can place the config file any where</strong><br>
Create new config files anywhere you want. Make sure you provide the correct path in the global git config in the previous step (<code>~/.gitconfig</code>)</p>
<p>In the example, I create them in the root directory, so every config file will be in the same place</p>
<h2>5. Check</h2>
<p>Go to any git repository in your work workspace and your personal workspace. Run this command. You should see your configured username correctly</p>
</div>



<div class="wp-block-kevinbatdorf-code-block-pro" data-code-block-pro-font-family="" style="font-size:.875rem;line-height:1.5rem;--cbp-tab-width:2;tab-size:var(--cbp-tab-width, 2)"><span role="button" tabindex="0" data-code="git config --get-all user.name" style="color:#f6f6f4;display:none" aria-label="Copy" class="code-block-pro-copy-button"><svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path class="with-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path><path class="without-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg></span><pre class="shiki dracula-soft" style="background-color: #282A36" tabindex="0"><code><span class="line"><span style="color: #62E884">git</span><span style="color: #F6F6F4"> </span><span style="color: #E7EE98">config</span><span style="color: #F6F6F4"> </span><span style="color: #BF9EEE">--get-all</span><span style="color: #F6F6F4"> </span><span style="color: #E7EE98">user.name</span></span></code></pre></div>



<div class="wp-block-jetpack-markdown"><p>or check which ssh command is being used by cloning any git repository using the ssh url (<code>git@github:username/repo.git</code>)</p>
<p>You should see the correct ssh command being used.</p>
</div>



<div class="wp-block-kevinbatdorf-code-block-pro" data-code-block-pro-font-family="" style="font-size:.875rem;line-height:1.5rem;--cbp-tab-width:2;tab-size:var(--cbp-tab-width, 2)"><span role="button" tabindex="0" data-code="GIT_TRACE=1 git clone git@github.com:username/repo.git" style="color:#f6f6f4;display:none" aria-label="Copy" class="code-block-pro-copy-button"><svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path class="with-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path><path class="without-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg></span><pre class="shiki dracula-soft" style="background-color: #282A36" tabindex="0"><code><span class="line"><span style="color: #BF9EEE">GIT_TRACE</span><span style="color: #F286C4">=</span><span style="color: #BF9EEE">1</span><span style="color: #F6F6F4"> </span><span style="color: #62E884">git</span><span style="color: #F6F6F4"> </span><span style="color: #E7EE98">clone</span><span style="color: #F6F6F4"> </span><span style="color: #E7EE98">git@github.com:username/repo.git</span></span></code></pre></div>



<p>output</p>



<div class="wp-block-kevinbatdorf-code-block-pro" data-code-block-pro-font-family="" style="font-size:.875rem;line-height:1.5rem;--cbp-tab-width:2;tab-size:var(--cbp-tab-width, 2)"><span role="button" tabindex="0" data-code="# you should see output like this
...
trace: run_command: unset GIT_DIR; GIT_PROTOCOL=version=2 'ssh -i ~/.ssh/id_ed25519_work' -o SendEnv=GIT_PROTOCOL git@github.com 'git-upload-pack '\''username/repo.git'\'''
..." style="color:#f6f6f4;display:none" aria-label="Copy" class="code-block-pro-copy-button"><svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path class="with-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path><path class="without-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg></span><pre class="shiki dracula-soft" style="background-color: #282A36" tabindex="0"><code><span class="line"><span style="color: #7B7F8B"># you should see output like this</span></span>
<span class="line"><span style="color: #97E1F1">...</span></span>
<span class="line"><span style="color: #62E884">trace:</span><span style="color: #F6F6F4"> </span><span style="color: #E7EE98">run_command:</span><span style="color: #F6F6F4"> </span><span style="color: #E7EE98">unset</span><span style="color: #F6F6F4"> </span><span style="color: #E7EE98">GIT_DIR</span><span style="color: #F6F6F4">; </span><span style="color: #BF9EEE">GIT_PROTOCOL</span><span style="color: #F286C4">=</span><span style="color: #E7EE98">version=</span><span style="color: #BF9EEE">2</span><span style="color: #F6F6F4"> </span><span style="color: #62E884">&#39;ssh -i ~/.ssh/id_ed25519_work&#39;</span><span style="color: #F6F6F4"> </span><span style="color: #BF9EEE">-o</span><span style="color: #F6F6F4"> </span><span style="color: #E7EE98">SendEnv=GIT_PROTOCOL</span><span style="color: #F6F6F4"> </span><span style="color: #E7EE98">git@github.com</span><span style="color: #F6F6F4"> </span><span style="color: #DEE492">&#39;</span><span style="color: #E7EE98">git-upload-pack </span><span style="color: #DEE492">&#39;</span><span style="color: #F286C4">\&#39;</span><span style="color: #DEE492">&#39;</span><span style="color: #E7EE98">username/repo.git</span><span style="color: #DEE492">&#39;</span><span style="color: #F286C4">\&#39;</span><span style="color: #DEE492">&#39;&#39;</span></span>
<span class="line"><span style="color: #97E1F1">...</span></span></code></pre></div>



<hr class="wp-block-separator has-alpha-channel-opacity"/>



<div class="wp-block-jetpack-markdown"><h2>Older revision (A harder way)</h2>
<p>This method will automatically choose a git account to use based on work directory. You can add as many git accounts as you want.</p>
<h3>Related files</h3>
<p>All files we gonna make change to</p>
<ul>
<li>~/.ssh/config</li>
<li>~/.gitconfig</li>
<li>~/workspace/work/.gitconfig</li>
<li>~/workspace/personal/.gitconfig</li>
</ul>
<h2>Create ssh keys</h2>
<p>Follow steps from github <a href="https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent">here</a>.<br>
Please name your keys differently for each account. e.g. <code>~/.ssh/id_ed25519-personal</code>, <code>~/.ssh/id_ed25519-work</code></p>
<h2>Config ssh keys</h2>
<p>In <code>~/.ssh/config</code> config it like this. Use different identity file for different host. You can name your host anything; we will use it in the next step.</p>
</div>



<div class="wp-block-kevinbatdorf-code-block-pro" data-code-block-pro-font-family="Code-Pro-JetBrains-Mono" style="font-size:.875rem;font-family:Code-Pro-JetBrains-Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;line-height:1.5rem;--cbp-tab-width:2;tab-size:var(--cbp-tab-width, 2)"><span role="button" tabindex="0" data-code="# Personal GitHub
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
    UseKeychain yes" style="color:#f6f6f4;display:none" aria-label="Copy" class="code-block-pro-copy-button"><svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path class="with-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path><path class="without-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg></span><pre class="shiki dracula-soft" style="background-color: #282A36" tabindex="0"><code><span class="line"><span style="color: #7B7F8B"># Personal GitHub</span></span>
<span class="line"><span style="color: #F286C4">Host</span><span style="color: #F6F6F4"> github-personal</span></span>
<span class="line"><span style="color: #F6F6F4">    </span><span style="color: #F286C4">HostName</span><span style="color: #F6F6F4"> github.com</span></span>
<span class="line"><span style="color: #F6F6F4">    </span><span style="color: #F286C4">User</span><span style="color: #F6F6F4"> git</span></span>
<span class="line"><span style="color: #F6F6F4">    </span><span style="color: #F286C4">IdentityFile</span><span style="color: #F6F6F4"> ~/.ssh/id_ed25519-personal</span></span>
<span class="line"><span style="color: #F6F6F4">    </span><span style="color: #F286C4">IdentitiesOnly</span><span style="color: #F6F6F4"> </span><span style="color: #BF9EEE">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color: #7B7F8B"># Work GitHub</span></span>
<span class="line"><span style="color: #F286C4">Host</span><span style="color: #F6F6F4"> github-work</span></span>
<span class="line"><span style="color: #F6F6F4">    </span><span style="color: #F286C4">HostName</span><span style="color: #F6F6F4"> github.com</span></span>
<span class="line"><span style="color: #F6F6F4">    </span><span style="color: #F286C4">User</span><span style="color: #F6F6F4"> git</span></span>
<span class="line"><span style="color: #F6F6F4">    </span><span style="color: #F286C4">IdentityFile</span><span style="color: #F6F6F4"> ~/.ssh/id_ed25519-work</span></span>
<span class="line"><span style="color: #F6F6F4">    </span><span style="color: #F286C4">IdentitiesOnly</span><span style="color: #F6F6F4"> </span><span style="color: #BF9EEE">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F286C4">Host</span><span style="color: #F6F6F4"> *</span></span>
<span class="line"><span style="color: #F6F6F4">    </span><span style="color: #F286C4">AddKeysToAgent</span><span style="color: #F6F6F4"> </span><span style="color: #BF9EEE">yes</span></span>
<span class="line"><span style="color: #F6F6F4">    </span><span style="color: #F286C4">UseKeychain</span><span style="color: #F6F6F4"> </span><span style="color: #BF9EEE">yes</span></span></code></pre></div>



<div class="wp-block-jetpack-markdown"><h2>Config global gitconfig</h2>
<p>We gonna make git agent know when to use which account based on workspace.<br>
If we are in <code>~/workspace/work</code>, it will use <code>~/workspace/work/.gitconfig</code><br>
If we are in <code>~/workspace/personal</code>, it will use <code>~/workspace/personal/.gitconfig</code></p>
<p>Edit your <code>~/.gitconfig</code></p>
</div>



<div class="wp-block-kevinbatdorf-code-block-pro" data-code-block-pro-font-family="Code-Pro-JetBrains-Mono" style="font-size:.875rem;font-family:Code-Pro-JetBrains-Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;line-height:1.5rem;--cbp-tab-width:2;tab-size:var(--cbp-tab-width, 2)"><span role="button" tabindex="0" data-code="[includeIf &quot;gitdir/i:~/workspace/work/&quot;]
    path = ~/workspace/work/.gitconfig

[includeIf &quot;gitdir/i:~/workspace/personal/&quot;]
    path = ~/workspace/personal/.gitconfig" style="color:#f6f6f4;display:none" aria-label="Copy" class="code-block-pro-copy-button"><svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path class="with-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path><path class="without-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg></span><pre class="shiki dracula-soft" style="background-color: #282A36" tabindex="0"><code><span class="line"><span style="color: #F6F6F4">[includeIf &quot;gitdir/i:~/workspace/work/&quot;]</span></span>
<span class="line"><span style="color: #F6F6F4">    </span><span style="color: #F286C4">path</span><span style="color: #F6F6F4"> </span><span style="color: #F286C4">=</span><span style="color: #F6F6F4"> ~/workspace/work/.gitconfig</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F6F6F4">[includeIf &quot;gitdir/i:~/workspace/personal/&quot;]</span></span>
<span class="line"><span style="color: #F6F6F4">    </span><span style="color: #F286C4">path</span><span style="color: #F6F6F4"> </span><span style="color: #F286C4">=</span><span style="color: #F6F6F4"> ~/workspace/personal/.gitconfig</span></span></code></pre></div>



<div class="wp-block-jetpack-markdown"><p>includeIf tells git agent to include .gitconfig in the specified path if we are in the specified gitdir.</p>
<h2>Config gitconfig for each account</h2>
<p>In <code>~/workspace/work/.gitconfig</code> and <code>~/workspace/personal/.gitconfig</code>, config based on a git account sits here. We will config email/name and rewrite github host here.</p>
</div>



<div class="wp-block-kevinbatdorf-code-block-pro" data-code-block-pro-font-family="Code-Pro-JetBrains-Mono" style="font-size:.875rem;font-family:Code-Pro-JetBrains-Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;line-height:1.5rem;--cbp-tab-width:2;tab-size:var(--cbp-tab-width, 2)"><span role="button" tabindex="0" data-code="[user]
    email = your-email@gmail.com
    name = git-username

[url &quot;git@github-personal&quot;]
    insteadOf = git@github.com" style="color:#f6f6f4;display:none" aria-label="Copy" class="code-block-pro-copy-button"><svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path class="with-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path><path class="without-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg></span><pre class="shiki dracula-soft" style="background-color: #282A36" tabindex="0"><code><span class="line"><span style="color: #F6F6F4">[user]</span></span>
<span class="line"><span style="color: #F6F6F4">    </span><span style="color: #F286C4">email</span><span style="color: #F6F6F4"> </span><span style="color: #F286C4">=</span><span style="color: #F6F6F4"> your-email@gmail.com</span></span>
<span class="line"><span style="color: #F6F6F4">    </span><span style="color: #F286C4">name</span><span style="color: #F6F6F4"> </span><span style="color: #F286C4">=</span><span style="color: #F6F6F4"> git-username</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F6F6F4">[url &quot;git@github-personal&quot;]</span></span>
<span class="line"><span style="color: #F6F6F4">    </span><span style="color: #F286C4">insteadOf</span><span style="color: #F6F6F4"> </span><span style="color: #F286C4">=</span><span style="color: #F6F6F4"> git@github.com</span></span></code></pre></div>



<div class="wp-block-jetpack-markdown"><h2>Check</h2>
<p>Go to any git repository in your work workspace and your personal workspace. Run this command. You should see your configured username correctly.</p>
</div>



<div class="wp-block-kevinbatdorf-code-block-pro" data-code-block-pro-font-family="Code-Pro-JetBrains-Mono" style="font-size:.875rem;font-family:Code-Pro-JetBrains-Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;line-height:1.5rem;--cbp-tab-width:2;tab-size:var(--cbp-tab-width, 2)"><span role="button" tabindex="0" data-code="git config --get-all user.name" style="color:#f6f6f4;display:none" aria-label="Copy" class="code-block-pro-copy-button"><svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path class="with-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path><path class="without-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg></span><pre class="shiki dracula-soft" style="background-color: #282A36" tabindex="0"><code><span class="line"><span style="color: #62E884">git</span><span style="color: #F6F6F4"> </span><span style="color: #E7EE98">config</span><span style="color: #F6F6F4"> </span><span style="color: #BF9EEE">--get-all</span><span style="color: #F6F6F4"> </span><span style="color: #E7EE98">user.name</span></span></code></pre></div>



<div class="wp-block-jetpack-markdown"><h2>References</h2>
<ol>
<li><a href="https://gist.github.com/rahularity/86da20fe3858e6b311de068201d279e3">https://gist.github.com/rahularity/86da20fe3858e6b311de068201d279e3</a></li>
<li><a href="https://stackoverflow.com/questions/4665337/git-pushing-to-remote-github-repository-as-wrong-user/12438179#12438179">https://stackoverflow.com/questions/4665337/git-pushing-to-remote-github-repository-as-wrong-user/12438179#12438179</a></li>
<li><a href="https://gist.github.com/jexchan/2351996">https://gist.github.com/jexchan/2351996</a></li>
</ol>
</div>

