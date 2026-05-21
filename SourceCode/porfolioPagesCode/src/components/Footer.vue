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
    { icon: 'email', name: 'Email', path: 'mailto:apple204023@gmail.com' },
    { icon: 'blog', name: 'Pixnet', path: 'https://www.pixnet.net/pcard/mdaysunlight?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn4OVmgK-eyvHnvWvq8gXYRWSfRxpQZntv4nS2STE68ayGu58kA3VUjmjoTr8_aem_HwxiLbAL7py1aK3jU3FeIg' },
    { icon: 'instagram', name: 'Instagram', path: 'https://www.instagram.com/m.day_sunlight/' },
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
            <div class="left">
                <div>
                    <h2 class="left-name">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                        <span>與我聯繫</span>
                    </h2>
                    <a v-for="item in tagItems" :href="item.path" target="_blank" class="left-link">
                        <BaseButton :icon="item.icon" :name="item.name" />
                    </a>
                </div>
                <div>Copyright &copy; 2026 Trista’s portfolio All rights reserved.</div>
            </div>

            <form class="ts-big right" @submit.prevent="openAlert">
                <h2>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                    <span>歡迎留言</span>
                </h2>
                <p>請留下您的聯絡資訊及稱呼方式，方便回覆您！</p>
                <div class="info">
                    <div>
                        <div class="info-mid">如何稱呼：</div>
                        <input type="text" v-model="formData.name" placeholder="似曾相似四神湯" class="ts-big">
                    </div>
                    <div>
                        <div class="info-mid">信箱：</div>
                        <input type="email" v-model="formData.email" placeholder="apple204023@gmail.com" class="ts-big">
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
    width: 100%;
    padding: 0 80px 80px 80px;
    display: flex;
    gap: 180px;
    display: flex;
    justify-content: space-around;
    margin-top: -2px;
}

.left {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.left-name {
    margin-bottom: 40px;
}

.left-link {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
}

.right {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.info {
    display: flex;
    gap: 40px;
}

.info-mid {
    padding-bottom: 20px;
}

.message {
    display: flex;
    gap: 30px;
}

.form-group {
    width: 80%;
    height: 200px;
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

@media (max-width:1750px) {
    .form-group {
        width: 70%;
    }

    .left {
        width: 40%;
    }

    .right {
        width: 60%;
    }
}

@media (max-width:1100px) {
    .content {
        gap: 80px;
    }
}

@media (max-width:900px) {
    .content {
        flex-direction: column;
    }

    .left {
        width: 100%;
        gap: 10px;
    }

    .right {
        width: 100%;
    }

    .info {
        flex-direction: column;
        gap: 20px;
    }
}

@media (max-width:550px) {
    .content {
        padding: 30px;
    }

    .form-group {
        width: 100%;
    }

    .message {
        flex-direction: column;
    }

    .btn-area {
        flex-direction: row;
    }
}
</style>