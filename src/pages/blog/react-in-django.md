---
layout: '../../layouts/BlogPost.astro'
heroImage: '/cover/react-in-django.webp'
title: 'วิธีเขียน React ใน Django'
description: 'พอดีได้มีโอกาสเข้าไปช่วยงานใน project Django แล้วต้องเขียน UI ที่มีความซับซ้อนระดับนึง คือมี component ที่ interactive'
pubDate: 2020-10-02 00:00:00 +0700
tags:
  - coding
  - th
---

พอดีได้มีโอกาสเข้าไปช่วยงานใน project Django แล้วต้องเขียน UI ที่มีความซับซ้อนระดับนึง คือมี component ที่ interactive

ซึ่งตัว project เดิมใช้ Django template อยู่ก่อน แต่นึกภาพว่าต้องเขียน UI นั้นใน django template + jQuery ก็เกิดปวดหัวแล้ว คงสามารถทำได้ แต่ปกติเขียน React จนคุ้นมืออยู่แล้ว ในหัวคิดจบแล้วว่าจะเขียนยังไง ก็เลยอยากใช้ React เขียน 😅 แต่ research ดูว่าจะเอา React มาใช้ได้ยังไงก็มีความวุ่นวายพอสมควร จนตัดสินใจเขียนไปบน Django template นั่นแหละ

ก็คงจะจบแค่นั้น แต่ว่าเขียนไปเขียนมามันก็ pain พอสมควร มันไม่ได้ง่ายขนาดนั้น มันคือการทำสิ่งที่ React ทำให้ด้วยตัวเอง ก็รู้สึกว่าลอง setup React ดูอีกสักตั้งดีกว่า งานมันคงจะเร็วขึ้นเยอะ ก็เลย research และหาท่า setup ที่เหมาะกับ project ที่ทำอยู่มาได้ค่ะ

## Setup

Setup นี้ จะเหมาะกับการใช้ React แค่บางส่วนของ project เท่านั้นนะคะ ข้อจำกัดคือจะใช้ได้แค่ React หากอยากลง lib อื่นๆ มาใช้เพิ่ม จะต้อง setup เพิ่มเติมจากนี้ค่ะ หรือใช้ท่าอื่นไปเลย

ท่าที่ใช้คือการใช้ React Standalone ค่ะ คือ import react มาใช้เฉพาะจุดและ setup babel เพิ่มเติมเพื่อใช้ JSX ค่ะ หากไม่ต้องการใช้ JSX สามารถข้ามช่วง setup babel ไปได้เลยค่ะ

1.  สร้าง DOM Container ใน django template (`template.html`)

    ```html
    <!-- ... existing HTML ... -->
    <div id="like_button_container"></div>
    <!-- ... existing HTML ... -->
    ```


2. import React เข้าไปใน django template (`template.html`)

    ```html
      <!-- ... other HTML ... -->

      <!-- Load React. -->
      <!-- Note: ตอน deploy เปลี่ยน "development.js" เป็น "production.min.js". -->
      <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
      <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
      <!-- Load our React component. -->
      <script src="{% static "react/like_button.js" %}"></script>
    </body>
    ```

3. สร้าง folder ใน static folder (`appname/static`) สร้าง folder ชื่อ `appname/static/react` และใน react สร้าง src `appname/static/react`

    ```shell
    cd appname/static
    mkdir react
    cd react
    mkdir src
    ```

4. สร้าง javaScript project ใน `appname/static/react`

    ```shell
    yarn init -y
    ```

5. Install dependencies ที่จำเป็นสำหรับใช้ JSX
    ```shell
    yarn add babel-cli@6 babel-preset-react-app@3
    ```
    ตอนนี้ package.json จะหน้าตาแบบนี้
    ```json
    {
      "name": "react",
      "version": "1.0.0",
      "main": "index.js",
      "license": "MIT",
      "dependencies": {
        "babel-cli": "6",
        "babel-preset-react-app": "3"
      }
    }
    ```

6. รันคำสั่ง

    ```shell
    yarn babel --watch src --out-dir . --presets react-app/prod
    ```

    คำสั่งนี้จะ watch file ทั้งหมดใน `/src` เพื่อจะ process ออกมาเป็น plain JavaScript code ที่ใช้ใน browser ได้

7. ถ้าเราสร้าง `src/like_button.js` ตอนนี้ เมื่อเซฟไฟล์ จะได้ไฟล์ `like_button.js` ที่ process แล้วออกมา

    ```js
    'use strict';

    const e = React.createElement
    const { useState } = React

    const Component = () => {
      const [liked, setLiked] = useState(false)
      return (
        <div>
          {liked && <div>liked!</div>}
          <button onClick={() => setLiked(!liked)}>{liked ? 'unlike' : 'like'}</button>
        </div>)
    }

    const domContainer = document.querySelector('#like_button_container')
    ReactDOM.render(e(Component), domContainer);
    ```

    ตัว babel จะคอย watch และ process JavaScript code ให้เราเอง โดยเราก็สามารถใช้ฟีเจอร์ต่างๆ ของ React ได้เต็มที่เลย

8. แต่ตอนเรา dev เราก็คงไม่อยากมาจำคำสั่ง `babel ..` ตลอด ก็ทำ script สำหรับ dev ไว้เลย โดยเพิ่ม script เข้าไปใน `package.json` แบบนี้

    จากนั้นตอนจะแก้ไขหรือ dev react ให้เข้ามาที่ `static/react` และรันคำสั่ง `yarn dev` ได้เลย 🥳

    จะเห็นว่าขั้นตอนมีนิดเดียวเอง น่าจะเข้าใจได้ไม่ยากค่ะ 😊

## แถม การนำข้อมูลจาก Django เข้าไปใน React

ส่งข้อมูลจาก view เข้ามาใน template ตามปกติเลย และใน template มี 2 วิธี

1.  นำข้อมูลยัดใส่ JavaScript variable โดย assign ใน <script> ก่อนหน้าที่จะโหลด react component วิธีเรียกใช้ก็สามารถเรียกใช้ตัวแปรได้โดยตรงเลย
2.  ส่งตัวแปรผ่าน data attributes ข้อจำกัดคือจะส่งได้แต่ text และข้อมูลจะถูก render ติดไปใน html sourcecode ด้วย วิธีเรียกใช้คือใช้คำสั่ง

    ```js
    *let* jsonData = JSON.parse(document.currentScript.getAttribute('data-json'))
    ```

**ตัวอย่างใน template**
```html
  <!-- 1. ประกาศตัวแปรไว้ก่อนที่จะ load react component -->
  <script>
    const title = "blah blah blah"
  </script>
  <script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>
  <!-- 2. ส่งตัวแปรผ่าน data attributes -->
  <script src="{% static "react/component.js" %}" data-json='{{ json|safe }}'></script>
</body>
```


## อ้างอิง

1.  Add React to a Website: <https://reactjs.org/docs/add-react-to-a-website.html>
2.  Tutorial: Django REST with React (Django 3 and a sprinkle of testing): <https://www.valentinog.com/blog/drf/>

Original publish at [Medium](https://medium.com/coding-tips/%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B9%80%E0%B8%82%E0%B8%B5%E0%B8%A2%E0%B8%99-react-%E0%B9%83%E0%B8%99-django-ed29c0003e25)