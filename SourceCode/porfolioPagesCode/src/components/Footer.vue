<script setup lang="ts">
import { reactive, ref } from 'vue';
import emailjs from '@emailjs/browser';
import BaseButton from './BaseButton.vue';

// 表單資料綁定
const formData = reactive({
    name: '',
    email: '',
    message: ''
});
// 控制 alert 視窗變數 (null: 隱藏, 1: 確認資訊, 2: 成功訊息)
const activeAlert = ref<number | null>(null);

const tagItems = ([
    { icon: 'linkedin', name: 'LinkedIn', path: 'https://www.linkedin.com/in/trista4023/' },
    // { icon: 'blog', name: '', path: '' },
]);

// 點擊送出，先設定跳出 alert1視窗
const openAlert = () => {
    if (!formData.name || !formData.email || !formData.message) {
        alert('請填寫完整資訊後再送出唷！');
        return;
    }
    activeAlert.value = 1;
};

// 重置
const resetBtn = () => {
    formData.name = '';
    formData.email = '';
    formData.message = '';
};

// 送出 => 執行 EmailJS
const sendMail = () => {
    const SERVICE_ID = 'service_2a0ppis';
    const TEMPLATE_ID = 'template_0t14bpb';
    const PUBLIC_KEY = 'kC4N5sDVB9AvnNB2A';

    emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
        .then(() => {
            activeAlert.value = 2;
            resetBtn();
        })
        .catch((err) => {
            console.error('發送失敗:', err);
            activeAlert.value = null;
            alert('郵件系統暫時出錯，請稍後再試！');
        });
};
</script>

<template>
    <div id="contact">
        <div class="wave"></div>
        <div class="content">
            <h2>
                <ion-icon name="chevron-forward-outline"></ion-icon>
                <span>與我聯繫 Get In Touch</span>
            </h2>
            <div class="link">
                <a v-for="item in tagItems" :href="item.path" target="_blank">
                    <BaseButton :icon="item.icon" :name="item.name" class="link-btn" />
                </a>
            </div>
            <form class="ts-big comment" @submit.prevent="openAlert">
                <h3>或是直接留言給我~ 請留下您的資料，方便回覆您！</h3>
                <div class="info">
                    <div>
                        <div class="info-mid">如何稱呼：</div>
                        <input type="text" v-model="formData.name" placeholder="Trista" class="ts-big">
                    </div>
                    <div>
                        <div class="info-mid">信箱：</div>
                        <input type="email" v-model="formData.email" placeholder="example@gmail.com" class="ts-big">
                    </div>
                </div>
                <div class="message">
                    <div class="form-group">
                        <label for="say"></label>
                        <textarea id="say" v-model="formData.message" class="ts-big message-area"
                            placeholder="請留下想說的話..."></textarea>
                    </div>
                    <div class="btn-area">
                        <BaseButton name="重置" type="button" @click="resetBtn" />
                        <BaseButton name="送出" type="submit" />
                    </div>
                </div>
            </form>
            <div>Copyright &copy; 2026 Trista’s portfolio All rights reserved.</div>
        </div>
    </div>

    <Transition name="fade">
        <div v-if="activeAlert" class="alert-overlay">
            <div v-if="activeAlert === 1" class="alert-box">
                <h2>確認資訊</h2>
                <p>請核對您提供的聯絡資料是否正確</p>
                <div class="alert-btns">
                    <BaseButton name="回去修改" type="button" @click="activeAlert = null" class="alertBtn" />
                    <BaseButton name="確認送出" type="button" @click="sendMail" class="alertBtn" />
                </div>
            </div>
            <div v-else-if="activeAlert === 2" class="alert-box">
                <h2>成功訊息</h2>
                <p>已收到您的留言~ 會盡快跟您回覆！</p>
                <div class="alert-btns">
                    <BaseButton name="回網站" type="button" @click="activeAlert = null" class="alertBtn" />
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
input,
button {
    background-color: var(--white);
    border: none;
    border-radius: 20px;
    padding: 0 20px;
    width: 100%;
    height: 50px;
    outline: none;
}

#contact {
    width: 100%;
}

.wave {
    background-image: url('@/assets/pic/footer-wave.svg');
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 150px;
}

.content {
    background-color: var(--nafo-white);
    padding: 0 80px 20px 80px;
    flex-direction: column;
    gap: 20px;
    margin-top: -2px;
}

.content,
.comment,
.link,
.info,
.message {
    display: flex;
}

.link-btn:hover {
    background-color: #d27666;
}

.comment {
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
}

.link,
.info,
.message {
    gap: 20px;
}

.info-mid,
.comment {
    padding-bottom: 20px;
}

.form-group {
    width: 80%;
    height: 150px;
}

.message-area {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    font-family: var(--font-family);
    padding: 15px;
    resize: none;
    line-height: 2;
    border: none;
    outline: none;
}

.btn-area {
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding-bottom: 10px;
    gap: 25px;
}

.alert-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.alert-box {
    background-color: var(--white);
    width: 500px;
    height: 300px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 45px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    padding: 0 30px;
}

.alert-btns {
    display: flex;
    justify-content: center;
    gap: 45px;
}

.alertBtn {
    border: 1px solid var(--border-color);
    justify-content: center;
}

@media (max-width:900px) {
    .content {
        padding: 0 40px 30px 40px;
    }

}

@media (max-width:600px) {

    .link,
    .message {
        flex-direction: column;
    }

    .info {
        flex-direction: column;
        gap: 20px;
    }

    .form-group {
        width: 100%;
    }

    .btn-area {
        flex-direction: row;
    }
}
</style>