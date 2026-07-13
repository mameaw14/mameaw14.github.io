---
layout: ../../layouts/BlogPost.astro
title: "วิธีเขียน React ใน Django"
date: 2020-10-01T17:00:00
updated: 2023-02-17T23:44:25
slug: "react-in-django"
categories: ["tech"]
tags: ["coding", "th"]
heroImage: ""
---

<div class="wp-block-jetpack-markdown"><p>พอดีได้มีโอกาสเข้าไปช่วยงานใน project Django แล้วต้องเขียน UI ที่มีความซับซ้อนระดับนึง คือมี component ที่ interactive</p>
<p>ซึ่งตัว project เดิมใช้ Django template อยู่ก่อน แต่นึกภาพว่าต้องเขียน UI นั้นใน django template + jQuery ก็เกิดปวดหัวแล้ว คงสามารถทำได้ แต่ปกติเขียน React จนคุ้นมืออยู่แล้ว ในหัวคิดจบแล้วว่าจะเขียนยังไง ก็เลยอยากใช้ React เขียน 😅 แต่ research ดูว่าจะเอา React มาใช้ได้ยังไงก็มีความวุ่นวายพอสมควร จนตัดสินใจเขียนไปบน Django template นั่นแหละ</p>
<p>ก็คงจะจบแค่นั้น แต่ว่าเขียนไปเขียนมามันก็ pain พอสมควร มันไม่ได้ง่ายขนาดนั้น มันคือการทำสิ่งที่ React ทำให้ด้วยตัวเอง ก็รู้สึกว่าลอง setup React ดูอีกสักตั้งดีกว่า งานมันคงจะเร็วขึ้นเยอะ ก็เลย research และหาท่า setup ที่เหมาะกับ project ที่ทำอยู่มาได้ค่ะ</p>
<h2>Setup</h2>
<p>Setup นี้ จะเหมาะกับการใช้ React แค่บางส่วนของ project เท่านั้นนะคะ ข้อจำกัดคือจะใช้ได้แค่ React หากอยากลง lib อื่นๆ มาใช้เพิ่ม จะต้อง setup เพิ่มเติมจากนี้ค่ะ หรือใช้ท่าอื่นไปเลย</p>
<p>ท่าที่ใช้คือการใช้ React Standalone ค่ะ คือ import react มาใช้เฉพาะจุดและ setup babel เพิ่มเติมเพื่อใช้ JSX ค่ะ หากไม่ต้องการใช้ JSX สามารถข้ามช่วง setup babel ไปได้เลยค่ะ</p>
<ol>
<li>สร้าง DOM Container ใน django template (<code>template.html</code>)</li>
</ol>
</div>



<div class="wp-block-kevinbatdorf-code-block-pro indent-1" data-code-block-pro-font-family="" style="font-size:.875rem;line-height:1.5rem"><span role="button" tabindex="0" data-code="&lt;!-- ... existing HTML ... --&gt;
&lt;div id=&quot;like_button_container&quot;&gt;&lt;/div&gt;
&lt;!-- ... existing HTML ... --&gt;" style="color:#f6f6f4;display:none" aria-label="Copy" class="code-block-pro-copy-button"><svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path class="with-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path><path class="without-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg></span><pre class="shiki dracula-soft" style="background-color: #282A36"><code><span class="line"><span style="color: #7B7F8B">&lt;!-- ... existing HTML ... --&gt;</span></span>
<span class="line"><span style="color: #F6F6F4">&lt;</span><span style="color: #F286C4">div</span><span style="color: #F6F6F4"> </span><span style="color: #62E884; font-style: italic">id</span><span style="color: #F286C4">=</span><span style="color: #DEE492">&quot;</span><span style="color: #E7EE98">like_button_container</span><span style="color: #DEE492">&quot;</span><span style="color: #F6F6F4">&gt;&lt;/</span><span style="color: #F286C4">div</span><span style="color: #F6F6F4">&gt;</span></span>
<span class="line"><span style="color: #7B7F8B">&lt;!-- ... existing HTML ... --&gt;</span></span></code></pre></div>



<div class="wp-block-jetpack-markdown"><ol start="2">
<li>import React เข้าไปใน django template (<code>template.html</code>)</li>
</ol>
</div>



<div class="wp-block-kevinbatdorf-code-block-pro indent-1" data-code-block-pro-font-family="" style="font-size:.875rem;line-height:1.5rem"><span role="button" tabindex="0" data-code="  &lt;!-- ... other HTML ... --&gt;

  &lt;!-- Load React. --&gt;
  &lt;!-- Note: ตอน deploy เปลี่ยน &quot;development.js&quot; เป็น &quot;production.min.js&quot;. --&gt;
  &lt;script src=&quot;https://unpkg.com/react@16/umd/react.development.js&quot; crossorigin&gt;&lt;/script&gt;
  &lt;script src=&quot;https://unpkg.com/react-dom@16/umd/react-dom.development.js&quot; crossorigin&gt;&lt;/script&gt;
  &lt;!-- Load our React component. --&gt;
  &lt;script src=&quot;{% static &quot;react/like_button.js&quot; %}&quot;&gt;&lt;/script&gt;
&lt;/body&gt;" style="color:#f6f6f4;display:none" aria-label="Copy" class="code-block-pro-copy-button"><svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path class="with-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path><path class="without-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg></span><pre class="shiki dracula-soft" style="background-color: #282A36"><code><span class="line"><span style="color: #F6F6F4">  </span><span style="color: #7B7F8B">&lt;!-- ... other HTML ... --&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F6F6F4">  </span><span style="color: #7B7F8B">&lt;!-- Load React. --&gt;</span></span>
<span class="line"><span style="color: #F6F6F4">  </span><span style="color: #7B7F8B">&lt;!-- Note: ตอน deploy เปลี่ยน &quot;development.js&quot; เป็น &quot;production.min.js&quot;. --&gt;</span></span>
<span class="line"><span style="color: #F6F6F4">  &lt;</span><span style="color: #F286C4">script</span><span style="color: #F6F6F4"> </span><span style="color: #62E884; font-style: italic">src</span><span style="color: #F286C4">=</span><span style="color: #DEE492">&quot;</span><span style="color: #E7EE98">https://unpkg.com/react@16/umd/react.development.js</span><span style="color: #DEE492">&quot;</span><span style="color: #F6F6F4"> </span><span style="color: #62E884; font-style: italic">crossorigin</span><span style="color: #F6F6F4">&gt;&lt;/</span><span style="color: #F286C4">script</span><span style="color: #F6F6F4">&gt;</span></span>
<span class="line"><span style="color: #F6F6F4">  &lt;</span><span style="color: #F286C4">script</span><span style="color: #F6F6F4"> </span><span style="color: #62E884; font-style: italic">src</span><span style="color: #F286C4">=</span><span style="color: #DEE492">&quot;</span><span style="color: #E7EE98">https://unpkg.com/react-dom@16/umd/react-dom.development.js</span><span style="color: #DEE492">&quot;</span><span style="color: #F6F6F4"> </span><span style="color: #62E884; font-style: italic">crossorigin</span><span style="color: #F6F6F4">&gt;&lt;/</span><span style="color: #F286C4">script</span><span style="color: #F6F6F4">&gt;</span></span>
<span class="line"><span style="color: #F6F6F4">  </span><span style="color: #7B7F8B">&lt;!-- Load our React component. --&gt;</span></span>
<span class="line"><span style="color: #F6F6F4">  &lt;</span><span style="color: #F286C4">script</span><span style="color: #F6F6F4"> </span><span style="color: #62E884; font-style: italic">src</span><span style="color: #F286C4">=</span><span style="color: #DEE492">&quot;</span><span style="color: #E7EE98">{% static </span><span style="color: #DEE492">&quot;</span><span style="color: #62E884; font-style: italic">react</span><span style="color: #EE6666; font-style: italic; text-decoration: underline">/like_button.js&quot;</span><span style="color: #F6F6F4"> </span><span style="color: #62E884; font-style: italic">%}</span><span style="color: #EE6666; font-style: italic; text-decoration: underline">&quot;</span><span style="color: #F6F6F4">&gt;&lt;/</span><span style="color: #F286C4">script</span><span style="color: #F6F6F4">&gt;</span></span>
<span class="line"><span style="color: #F6F6F4">&lt;/</span><span style="color: #F286C4">body</span><span style="color: #F6F6F4">&gt;</span></span></code></pre></div>



<div class="wp-block-jetpack-markdown"><ol start="3">
<li>สร้าง folder ใน static folder (<code>appname/static</code>) สร้าง folder ชื่อ <code>appname/static/react</code> และใน react สร้าง src <code>appname/static/react</code></li>
</ol>
</div>



<div class="wp-block-kevinbatdorf-code-block-pro indent-1" data-code-block-pro-font-family="" style="font-size:.875rem;line-height:1.5rem"><span role="button" tabindex="0" data-code="cd appname/static
mkdir react
cd react
mkdir src" style="color:#f6f6f4;display:none" aria-label="Copy" class="code-block-pro-copy-button"><svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path class="with-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path><path class="without-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg></span><pre class="shiki dracula-soft" style="background-color: #282A36"><code><span class="line"><span style="color: #97E1F1">cd</span><span style="color: #F6F6F4"> </span><span style="color: #E7EE98">appname/static</span></span>
<span class="line"><span style="color: #F6F6F4">mkdir </span><span style="color: #E7EE98">react</span></span>
<span class="line"><span style="color: #97E1F1">cd</span><span style="color: #F6F6F4"> </span><span style="color: #E7EE98">react</span></span>
<span class="line"><span style="color: #F6F6F4">mkdir </span><span style="color: #E7EE98">src</span></span></code></pre></div>



<div class="wp-block-jetpack-markdown"><ol start="4">
<li>สร้าง javaScript project ใน <code>appname/static/react</code></li>
</ol>
</div>



<div class="wp-block-kevinbatdorf-code-block-pro indent-1" data-code-block-pro-font-family="" style="font-size:.875rem;line-height:1.5rem"><span role="button" tabindex="0" data-code="yarn init -y" style="color:#f6f6f4;display:none" aria-label="Copy" class="code-block-pro-copy-button"><svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path class="with-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path><path class="without-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg></span><pre class="shiki dracula-soft" style="background-color: #282A36"><code><span class="line"><span style="color: #F6F6F4">yarn </span><span style="color: #E7EE98">init</span><span style="color: #F6F6F4"> </span><span style="color: #BF9EEE">-y</span></span></code></pre></div>



<div class="wp-block-jetpack-markdown"><ol start="5">
<li>Install dependencies ที่จำเป็นสำหรับใช้ JSX</li>
</ol>
</div>



<div class="wp-block-kevinbatdorf-code-block-pro indent-1" data-code-block-pro-font-family="" style="font-size:.875rem;line-height:1.5rem"><span role="button" tabindex="0" data-code="yarn add babel-cli@6 babel-preset-react-app@3" style="color:#f6f6f4;display:none" aria-label="Copy" class="code-block-pro-copy-button"><svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path class="with-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path><path class="without-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg></span><pre class="shiki dracula-soft" style="background-color: #282A36"><code><span class="line"><span style="color: #F6F6F4">yarn </span><span style="color: #E7EE98">add</span><span style="color: #F6F6F4"> </span><span style="color: #E7EE98">babel-cli@</span><span style="color: #BF9EEE">6</span><span style="color: #F6F6F4"> </span><span style="color: #E7EE98">babel-preset-react-app@</span><span style="color: #BF9EEE">3</span></span></code></pre></div>



<div class="wp-block-jetpack-markdown indent-1"><p>ตอนนี้ package.json จะหน้าตาแบบนี้</p>
</div>



<div class="wp-block-kevinbatdorf-code-block-pro indent-1" data-code-block-pro-font-family="" style="font-size:.875rem;line-height:1.5rem"><span role="button" tabindex="0" data-code="{
  &quot;name&quot;: &quot;react&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;license&quot;: &quot;MIT&quot;,
  &quot;dependencies&quot;: {
    &quot;babel-cli&quot;: &quot;6&quot;,
    &quot;babel-preset-react-app&quot;: &quot;3&quot;
  }
}" style="color:#f6f6f4;display:none" aria-label="Copy" class="code-block-pro-copy-button"><svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path class="with-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path><path class="without-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg></span><pre class="shiki dracula-soft" style="background-color: #282A36"><code><span class="line"><span style="color: #F6F6F4">{</span></span>
<span class="line"><span style="color: #F6F6F4">  </span><span style="color: #97E2F2">&quot;</span><span style="color: #97E1F1">name</span><span style="color: #97E2F2">&quot;</span><span style="color: #F286C4">:</span><span style="color: #F6F6F4"> </span><span style="color: #DEE492">&quot;</span><span style="color: #E7EE98">react</span><span style="color: #DEE492">&quot;</span><span style="color: #F6F6F4">,</span></span>
<span class="line"><span style="color: #F6F6F4">  </span><span style="color: #97E2F2">&quot;</span><span style="color: #97E1F1">version</span><span style="color: #97E2F2">&quot;</span><span style="color: #F286C4">:</span><span style="color: #F6F6F4"> </span><span style="color: #DEE492">&quot;</span><span style="color: #E7EE98">1.0.0</span><span style="color: #DEE492">&quot;</span><span style="color: #F6F6F4">,</span></span>
<span class="line"><span style="color: #F6F6F4">  </span><span style="color: #97E2F2">&quot;</span><span style="color: #97E1F1">main</span><span style="color: #97E2F2">&quot;</span><span style="color: #F286C4">:</span><span style="color: #F6F6F4"> </span><span style="color: #DEE492">&quot;</span><span style="color: #E7EE98">index.js</span><span style="color: #DEE492">&quot;</span><span style="color: #F6F6F4">,</span></span>
<span class="line"><span style="color: #F6F6F4">  </span><span style="color: #97E2F2">&quot;</span><span style="color: #97E1F1">license</span><span style="color: #97E2F2">&quot;</span><span style="color: #F286C4">:</span><span style="color: #F6F6F4"> </span><span style="color: #DEE492">&quot;</span><span style="color: #E7EE98">MIT</span><span style="color: #DEE492">&quot;</span><span style="color: #F6F6F4">,</span></span>
<span class="line"><span style="color: #F6F6F4">  </span><span style="color: #97E2F2">&quot;</span><span style="color: #97E1F1">dependencies</span><span style="color: #97E2F2">&quot;</span><span style="color: #F286C4">:</span><span style="color: #F6F6F4"> {</span></span>
<span class="line"><span style="color: #F6F6F4">    </span><span style="color: #97E2F2">&quot;</span><span style="color: #97E1F1">babel-cli</span><span style="color: #97E2F2">&quot;</span><span style="color: #F286C4">:</span><span style="color: #F6F6F4"> </span><span style="color: #DEE492">&quot;</span><span style="color: #E7EE98">6</span><span style="color: #DEE492">&quot;</span><span style="color: #F6F6F4">,</span></span>
<span class="line"><span style="color: #F6F6F4">    </span><span style="color: #97E2F2">&quot;</span><span style="color: #97E1F1">babel-preset-react-app</span><span style="color: #97E2F2">&quot;</span><span style="color: #F286C4">:</span><span style="color: #F6F6F4"> </span><span style="color: #DEE492">&quot;</span><span style="color: #E7EE98">3</span><span style="color: #DEE492">&quot;</span></span>
<span class="line"><span style="color: #F6F6F4">  }</span></span>
<span class="line"><span style="color: #F6F6F4">}</span></span></code></pre></div>



<div class="wp-block-jetpack-markdown"><ol start="6">
<li>รันคำสั่ง</li>
</ol>
</div>



<div class="wp-block-kevinbatdorf-code-block-pro indent-1" data-code-block-pro-font-family="" style="font-size:.875rem;line-height:1.5rem"><span role="button" tabindex="0" data-code="yarn babel --watch src --out-dir . --presets react-app/prod" style="color:#f6f6f4;display:none" aria-label="Copy" class="code-block-pro-copy-button"><svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path class="with-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path><path class="without-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg></span><pre class="shiki dracula-soft" style="background-color: #282A36"><code><span class="line"><span style="color: #F6F6F4">yarn </span><span style="color: #E7EE98">babel</span><span style="color: #F6F6F4"> </span><span style="color: #BF9EEE">--watch</span><span style="color: #F6F6F4"> </span><span style="color: #E7EE98">src</span><span style="color: #F6F6F4"> </span><span style="color: #BF9EEE">--out-dir</span><span style="color: #F6F6F4"> </span><span style="color: #E7EE98">.</span><span style="color: #F6F6F4"> </span><span style="color: #BF9EEE">--presets</span><span style="color: #F6F6F4"> </span><span style="color: #E7EE98">react-app/prod</span></span></code></pre></div>



<div class="wp-block-jetpack-markdown indent-1"><p>คำสั่งนี้จะ watch file ทั้งหมดใน <code>/src</code> เพื่อจะ process ออกมาเป็น plain JavaScript code ที่ใช้ใน browser ได้</p>
</div>



<div class="wp-block-jetpack-markdown"><ol start="7">
<li>ถ้าเราสร้าง <code>src/like_button.js</code> ตอนนี้ เมื่อเซฟไฟล์ จะได้ไฟล์ <code>like_button.js</code> ที่ process แล้วออกมา</li>
</ol>
</div>



<div class="wp-block-kevinbatdorf-code-block-pro indent-1" data-code-block-pro-font-family="" style="font-size:.875rem;line-height:1.5rem"><span role="button" tabindex="0" data-code="'use strict';

const e = React.createElement
const { useState } = React

const Component = () =&gt; {
  const [liked, setLiked] = useState(false)
  return (
    &lt;div&gt;
      {liked &amp;&amp; &lt;div&gt;liked!&lt;/div&gt;}
      &lt;button onClick={() =&gt; setLiked(!liked)}&gt;{liked ? 'unlike' : 'like'}&lt;/button&gt;
    &lt;/div&gt;)
}

const domContainer = document.querySelector('#like_button_container')
ReactDOM.render(e(Component), domContainer);" style="color:#f6f6f4;display:none" aria-label="Copy" class="code-block-pro-copy-button"><svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path class="with-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path><path class="without-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg></span><pre class="shiki dracula-soft" style="background-color: #282A36"><code><span class="line"><span style="color: #DEE492">&#39;</span><span style="color: #E7EE98">use strict</span><span style="color: #DEE492">&#39;</span><span style="color: #F6F6F4">;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F286C4">const</span><span style="color: #F6F6F4"> e </span><span style="color: #F286C4">=</span><span style="color: #F6F6F4"> React.createElement</span></span>
<span class="line"><span style="color: #F286C4">const</span><span style="color: #F6F6F4"> { useState } </span><span style="color: #F286C4">=</span><span style="color: #F6F6F4"> React</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F286C4">const</span><span style="color: #F6F6F4"> </span><span style="color: #62E884">Component</span><span style="color: #F6F6F4"> </span><span style="color: #F286C4">=</span><span style="color: #F6F6F4"> () </span><span style="color: #F286C4">=&gt;</span><span style="color: #F6F6F4"> {</span></span>
<span class="line"><span style="color: #F6F6F4">  </span><span style="color: #F286C4">const</span><span style="color: #F6F6F4"> [liked, setLiked] </span><span style="color: #F286C4">=</span><span style="color: #F6F6F4"> </span><span style="color: #62E884">useState</span><span style="color: #F6F6F4">(</span><span style="color: #BF9EEE">false</span><span style="color: #F6F6F4">)</span></span>
<span class="line"><span style="color: #F6F6F4">  </span><span style="color: #F286C4">return</span><span style="color: #F6F6F4"> (</span></span>
<span class="line"><span style="color: #F6F6F4">    &lt;</span><span style="color: #F286C4">div</span><span style="color: #F6F6F4">&gt;</span></span>
<span class="line"><span style="color: #F6F6F4">      </span><span style="color: #F286C4">{</span><span style="color: #F6F6F4">liked </span><span style="color: #F286C4">&amp;&amp;</span><span style="color: #F6F6F4"> &lt;</span><span style="color: #F286C4">div</span><span style="color: #F6F6F4">&gt;liked!&lt;/</span><span style="color: #F286C4">div</span><span style="color: #F6F6F4">&gt;</span><span style="color: #F286C4">}</span></span>
<span class="line"><span style="color: #F6F6F4">      &lt;</span><span style="color: #F286C4">button</span><span style="color: #F6F6F4"> </span><span style="color: #62E884; font-style: italic">onClick</span><span style="color: #F286C4">={</span><span style="color: #F6F6F4">() </span><span style="color: #F286C4">=&gt;</span><span style="color: #F6F6F4"> </span><span style="color: #62E884">setLiked</span><span style="color: #F6F6F4">(</span><span style="color: #F286C4">!</span><span style="color: #F6F6F4">liked)</span><span style="color: #F286C4">}</span><span style="color: #F6F6F4">&gt;</span><span style="color: #F286C4">{</span><span style="color: #F6F6F4">liked </span><span style="color: #F286C4">?</span><span style="color: #F6F6F4"> </span><span style="color: #DEE492">&#39;</span><span style="color: #E7EE98">unlike</span><span style="color: #DEE492">&#39;</span><span style="color: #F6F6F4"> </span><span style="color: #F286C4">:</span><span style="color: #F6F6F4"> </span><span style="color: #DEE492">&#39;</span><span style="color: #E7EE98">like</span><span style="color: #DEE492">&#39;</span><span style="color: #F286C4">}</span><span style="color: #F6F6F4">&lt;/</span><span style="color: #F286C4">button</span><span style="color: #F6F6F4">&gt;</span></span>
<span class="line"><span style="color: #F6F6F4">    &lt;/</span><span style="color: #F286C4">div</span><span style="color: #F6F6F4">&gt;)</span></span>
<span class="line"><span style="color: #F6F6F4">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F286C4">const</span><span style="color: #F6F6F4"> domContainer </span><span style="color: #F286C4">=</span><span style="color: #F6F6F4"> document.</span><span style="color: #62E884">querySelector</span><span style="color: #F6F6F4">(</span><span style="color: #DEE492">&#39;</span><span style="color: #E7EE98">#like_button_container</span><span style="color: #DEE492">&#39;</span><span style="color: #F6F6F4">)</span></span>
<span class="line"><span style="color: #F6F6F4">ReactDOM.</span><span style="color: #62E884">render</span><span style="color: #F6F6F4">(</span><span style="color: #62E884">e</span><span style="color: #F6F6F4">(Component), domContainer);</span></span></code></pre></div>



<div class="wp-block-jetpack-markdown indent-1"><p>ตัว babel จะคอย watch และ process JavaScript code ให้เราเอง โดยเราก็สามารถใช้ฟีเจอร์ต่างๆ ของ React ได้เต็มที่เลย</p>
</div>



<div class="wp-block-jetpack-markdown"><ol start="8">
<li>
<p>แต่ตอนเรา dev เราก็คงไม่อยากมาจำคำสั่ง <code>babel ..</code> ตลอด ก็ทำ script สำหรับ dev ไว้เลย โดยเพิ่ม script เข้าไปใน <code>package.json</code> แบบนี้</p>
<p>จากนั้นตอนจะแก้ไขหรือ dev react ให้เข้ามาที่ <code>static/react</code> และรันคำสั่ง <code>yarn dev</code> ได้เลย 🥳</p>
<p>จะเห็นว่าขั้นตอนมีนิดเดียวเอง น่าจะเข้าใจได้ไม่ยากค่ะ 😊</p>
</li>
</ol>
<h2>แถม การนำข้อมูลจาก Django เข้าไปใน React</h2>
<p>ส่งข้อมูลจาก view เข้ามาใน template ตามปกติเลย และใน template มี 2 วิธี</p>
<ol>
<li>นำข้อมูลยัดใส่ JavaScript variable โดย assign ใน &lt;script&gt; ก่อนหน้าที่จะโหลด react component วิธีเรียกใช้ก็สามารถเรียกใช้ตัวแปรได้โดยตรงเลย</li>
<li>ส่งตัวแปรผ่าน data attributes ข้อจำกัดคือจะส่งได้แต่ text และข้อมูลจะถูก render ติดไปใน html sourcecode ด้วย วิธีเรียกใช้คือใช้คำสั่ง</li>
</ol>
</div>



<div class="wp-block-kevinbatdorf-code-block-pro indent-1" data-code-block-pro-font-family="" style="font-size:.875rem;line-height:1.5rem"><span role="button" tabindex="0" data-code="*let* jsonData = JSON.parse(document.currentScript.getAttribute('data-json'))" style="color:#f6f6f4;display:none" aria-label="Copy" class="code-block-pro-copy-button"><svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path class="with-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path><path class="without-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg></span><pre class="shiki dracula-soft" style="background-color: #282A36"><code><span class="line"><span style="color: #F286C4">*let</span><span style="color: #F6F6F4">* jsonData </span><span style="color: #F286C4">=</span><span style="color: #F6F6F4"> </span><span style="color: #BF9EEE">JSON</span><span style="color: #F6F6F4">.</span><span style="color: #62E884">parse</span><span style="color: #F6F6F4">(document.currentScript.</span><span style="color: #62E884">getAttribute</span><span style="color: #F6F6F4">(</span><span style="color: #DEE492">&#39;</span><span style="color: #E7EE98">data-json</span><span style="color: #DEE492">&#39;</span><span style="color: #F6F6F4">))</span></span></code></pre></div>



<div class="wp-block-jetpack-markdown"><p><strong>ตัวอย่างใน template</strong></p>
</div>



<div class="wp-block-kevinbatdorf-code-block-pro" data-code-block-pro-font-family="" style="font-size:.875rem;line-height:1.5rem"><span role="button" tabindex="0" data-code="&lt;!-- 1. ประกาศตัวแปรไว้ก่อนที่จะ load react component --&gt;
  &lt;script&gt;
    const title = &quot;blah blah blah&quot;
  &lt;/script&gt;
  &lt;script src=&quot;https://unpkg.com/react@16/umd/react.production.min.js&quot; crossorigin&gt;&lt;/script&gt;
  &lt;script src=&quot;https://unpkg.com/react-dom@16/umd/react-dom.production.min.js&quot; crossorigin&gt;&lt;/script&gt;
  &lt;!-- 2. ส่งตัวแปรผ่าน data attributes --&gt;
  &lt;script src=&quot;{% static &quot;react/component.js&quot; %}&quot; data-json='{{ json|safe }}'&gt;&lt;/script&gt;
&lt;/body&gt;" style="color:#f6f6f4;display:none" aria-label="Copy" class="code-block-pro-copy-button"><svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path class="with-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path><path class="without-check" stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg></span><pre class="shiki dracula-soft" style="background-color: #282A36"><code><span class="line"><span style="color: #7B7F8B">&lt;!-- 1. ประกาศตัวแปรไว้ก่อนที่จะ load react component --&gt;</span></span>
<span class="line"><span style="color: #F6F6F4">  &lt;</span><span style="color: #F286C4">script</span><span style="color: #F6F6F4">&gt;</span></span>
<span class="line"><span style="color: #F6F6F4">    </span><span style="color: #F286C4">const</span><span style="color: #F6F6F4"> title </span><span style="color: #F286C4">=</span><span style="color: #F6F6F4"> </span><span style="color: #DEE492">&quot;</span><span style="color: #E7EE98">blah blah blah</span><span style="color: #DEE492">&quot;</span></span>
<span class="line"><span style="color: #F6F6F4">  &lt;/</span><span style="color: #F286C4">script</span><span style="color: #F6F6F4">&gt;</span></span>
<span class="line"><span style="color: #F6F6F4">  &lt;</span><span style="color: #F286C4">script</span><span style="color: #F6F6F4"> </span><span style="color: #62E884; font-style: italic">src</span><span style="color: #F286C4">=</span><span style="color: #DEE492">&quot;</span><span style="color: #E7EE98">https://unpkg.com/react@16/umd/react.production.min.js</span><span style="color: #DEE492">&quot;</span><span style="color: #F6F6F4"> </span><span style="color: #62E884; font-style: italic">crossorigin</span><span style="color: #F6F6F4">&gt;&lt;/</span><span style="color: #F286C4">script</span><span style="color: #F6F6F4">&gt;</span></span>
<span class="line"><span style="color: #F6F6F4">  &lt;</span><span style="color: #F286C4">script</span><span style="color: #F6F6F4"> </span><span style="color: #62E884; font-style: italic">src</span><span style="color: #F286C4">=</span><span style="color: #DEE492">&quot;</span><span style="color: #E7EE98">https://unpkg.com/react-dom@16/umd/react-dom.production.min.js</span><span style="color: #DEE492">&quot;</span><span style="color: #F6F6F4"> </span><span style="color: #62E884; font-style: italic">crossorigin</span><span style="color: #F6F6F4">&gt;&lt;/</span><span style="color: #F286C4">script</span><span style="color: #F6F6F4">&gt;</span></span>
<span class="line"><span style="color: #F6F6F4">  </span><span style="color: #7B7F8B">&lt;!-- 2. ส่งตัวแปรผ่าน data attributes --&gt;</span></span>
<span class="line"><span style="color: #F6F6F4">  &lt;</span><span style="color: #F286C4">script</span><span style="color: #F6F6F4"> </span><span style="color: #62E884; font-style: italic">src</span><span style="color: #F286C4">=</span><span style="color: #DEE492">&quot;</span><span style="color: #E7EE98">{% static </span><span style="color: #DEE492">&quot;</span><span style="color: #62E884; font-style: italic">react</span><span style="color: #EE6666; font-style: italic; text-decoration: underline">/component.js&quot;</span><span style="color: #F6F6F4"> </span><span style="color: #62E884; font-style: italic">%}</span><span style="color: #EE6666; font-style: italic; text-decoration: underline">&quot;</span><span style="color: #F6F6F4"> </span><span style="color: #62E884; font-style: italic">data-json</span><span style="color: #F286C4">=</span><span style="color: #DEE492">&#39;</span><span style="color: #E7EE98">{{ json|safe }}</span><span style="color: #DEE492">&#39;</span><span style="color: #F6F6F4">&gt;&lt;/</span><span style="color: #F286C4">script</span><span style="color: #F6F6F4">&gt;</span></span>
<span class="line"><span style="color: #F6F6F4">&lt;/</span><span style="color: #F286C4">body</span><span style="color: #F6F6F4">&gt;</span></span></code></pre></div>



<div class="wp-block-jetpack-markdown"><h2>อ้างอิง</h2>
<ol>
<li>Add React to a Website: <a href="https://reactjs.org/docs/add-react-to-a-website.html">https://reactjs.org/docs/add-react-to-a-website.html</a></li>
<li>Tutorial: Django REST with React (Django 3 and a sprinkle of testing): <a href="https://www.valentinog.com/blog/drf/">https://www.valentinog.com/blog/drf/</a></li>
</ol>
<p>Original publish at <a href="https://medium.com/coding-tips/%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B9%80%E0%B8%82%E0%B8%B5%E0%B8%A2%E0%B8%99-react-%E0%B9%83%E0%B8%99-django-ed29c0003e25">Medium</a></p>
</div>

