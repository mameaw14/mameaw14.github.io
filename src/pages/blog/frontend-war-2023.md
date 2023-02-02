---
layout: '../../layouts/BlogPost.astro'
title: 'ขึ้น Frontend ในปี 2023 ใช้อะไรดี จาก Talk Frontend War'
description: 'ก่อนอื่นขอบคุณผู้จัดก่อนที่จัด talk นี้ รวมเหล่า frontend มาแชร์ประสบการณ์กัน ได้ประโยชน์มากค่ะ
ขอสรุปแบบสั้นๆ ไม่มีดีเทล เพราะจำไม่ได้ 555'
pubDate: 2023-02-02 23:39:00 +0700
tags:
  - coding
  - frontend
  - th
---


ก่อนอื่นขอบคุณผู้จัดก่อนที่จัด talk นี้ รวมเหล่า frontend มาแชร์ประสบการณ์กัน ได้ประโยชน์มากค่ะ
ขอสรุปแบบสั้นๆ ไม่มีดีเทล เพราะจำไม่ได้ 555

## ขึ้นโปรเจกต์ frontend ใช้อะไรดี ในปี 2023 ?
คำตอบ **React + Vite**

#### Why React ?
ก็ชัดเจนว่าทุกคนยังใช้ React อยู่ ตัวอื่นๆ ที่เรียกว่าเป็น alternative อย่าง Svelte, Vue ก็ไม่มีตัวไหนที่ mature เท่า React อย่าง tooling ใน IDE ก็จะมีบั๊กๆ อยู่บ้าง แต่ก็มี use case ที่น่าสนใจของ Svelte อยู่ คือ Svelte เขา treat animation เป็น first class citizen เพราะฉะนั้นงานไหนที่จะใช้ animation ก็ลองดู Svelte เป็นตัวเลือกได้

#### Why Vite ?
ตัว alternative ในหมวดนี้ก็จะเป็น Create React App เนอะ ซึ่งมันค่อนข้างไม่ active สักพัก แล้ว Vite มันมากว่าละ อันนี้ส่วนตัวยังไม่เคยเล่น พูดเปรียบเทียบให้ไม่ถูก แต่ community เขาไป Vite กันแล้วอะ ก็ตามนั้นน

## ตัวอื่นๆ ล่ะ เป็นไงบ้าง ?

### Astro
use case หลักในปัจจุบันคือทำ static site ทำ personal site, blog อะไรพวกนี้ ยังใหม่อยู่ ดูไปก่อน แต่ docs ทำดี v2 เพิ่งออก ทำ dynamic render ได้แล้ว

### Angular
ไม่มีใครใช้ละ จะใช้ก็ใช้ได้ ข้อดีอย่างหนึ่งที่คนชอบคือแบบฟอร์ม https://angular.io/guide/reactive-forms

### Svelte
ดี ใช้ง่าย คนชอบ แต่ doc ดูเหมือนยังทำไม่เสร็จ ถ้าใช้ animation ก็ลองพิจารณาดู เพราะเขา provide animation มาให้ out of the box

### Vue
กลางๆ ไม่ได้พูดถึงเป็นพิเศษ ก็มีคนใช้อยู่ มีคนเห็นมีรับสมัครงานเขียน Vue ในไทย

### Remix
พวกงานพื้นฐาน เขา built in มาให้เลย ใช้ง่าย เช่น data fetching มันทำมาให้เลย คือ loader กับมี action ให้ใช้ ก็คือไม่ต้องเรียนรู้เยอะ

### NextJS
ไม่ค่อยได้พูดถึงเท่าไร แต่เป็นตัวที่ทุกคนใช้ๆ กันอยู่แล้ว พร้อมใช้สำหรับ App แต่อย่าเพิ่ง สำหรับ TurboPack

### Create React App
ไม่แนะนำแร้วววว เลิกใช้ อ่านกระทู้สุดร้อนในตอนนี้ ล่าสุดเขาถึงกันตรงนี้ https://github.com/reactjs/reactjs.org/pull/5487#issuecomment-1409720741

### T3
tool สำหรับขึ้น Nextjs fullstack with typesafe มีของที่ opinionated by t3 พ่วงมาให้ พวก tailwind, tRPC, typescript, prisma, nextauth

### อื่นๆ ที่สรุปไม่ถูก
SvelteKit, Nuxt, Qwik, Solid, TurboPack, fastify

### ประเด็นอื่นๆ ที่น่าสนใจ
- error handling ในแต่ละ framework บางตัวมัน error แล้วหาไม่เจอว่า root cause อยู่ไหน ซึ่งหลายๆ ตัวก็ออกอัปเดตเรื่องนี้กันออกมา ก็เป็นจุดสำคัญจุดหนึ่งใน development process อยู่เหมือนกัน

&nbsp;
&nbsp;

ก็สรุปไว้ประมาณนี้ อยากเจอกับพี่โอม พี่ไท อยากฟังเรื่อง frontend ต่อ ก็ไปงาน National Coding Day ได้ค้าา 
