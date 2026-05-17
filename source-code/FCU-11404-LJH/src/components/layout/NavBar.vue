<script>
import { RouterLink } from 'vue-router'

export default {
    data() {
        return {
            // Navbar 的資料結構
            menuItems: [
                { title: '首頁', path: '/' },
                {
                    title: '關於聯盟',
                    subItems: [
                        { title: '聯盟簡介', path: '/about' },
                        { title: '聯盟象徵與集點活動', path: '/point' }
                    ]
                },
                {
                    title: '活動訊息',
                    subItems: [
                        { title: '活動資訊', path: '/information' },
                        { title: '活動影音', path: '/video' }
                    ]
                },
                { title: '未來研究室', path: '/future' },
                { title: '資源地圖', path: '/resource-map' }
            ],
            // 追蹤手機版當前開啟的子選單
            openItem: null,
            // 用來追蹤手機版主選單是否開啟
            isMobileMenuOpen: false,
        }
    },
    methods: {
        // 切換手機版主選單的開關狀態
        toggleMobileMenu() {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
        },
        // 切換手機版子選單
        toggleSubMenu(title) {
            const targetItem = this.menuItems.find(item => item.title === title);
            if (!targetItem || !targetItem.subItems || targetItem.subItems.length === 0) {
                return;
            }
            this.openItem = this.openItem === title ? null : title;
        },
        // 關閉手機版選單，直接操作狀態
        closeMobileMenu() {
            this.isMobileMenuOpen = false;
        },
        // 處理點擊外部區域的事件
        handleClickOutside(event) {
            // this.$el 是此元件的根 DOM 元素 (<nav>)
            // 如果點擊的目標不在 <nav> 元素內，就關閉選單
            if (this.$el && !this.$el.contains(event.target)) {
                this.closeMobileMenu();
            }
        }
    },
    // 生命週期鉤子：元件掛載後
    mounted() {
        // 新增全域點擊事件監聽器
        document.addEventListener('click', this.handleClickOutside);
    },
    // 生命週期鉤子：元件卸載前
    beforeUnmount() {
        // 移除監聽器以避免記憶體洩漏
        document.removeEventListener('click', this.handleClickOutside);
    },
    components: {
        RouterLink
    }
}
</script>

<template>
    <nav class="navbar navbar-expand-xl custom-navbar fixed-top">
        <!-- 品牌 Logo 連結到首頁 -->
        <router-link to="/" class="text-h2 navbar-brand-custom">少年英雄聯盟</router-link>
        
        <!-- 移除 data-bs-* 屬性，改用 @click 觸發 Vue 方法 -->
        <button class="navbar-toggler" type="button" @click="toggleMobileMenu"
            aria-controls="mainNav" :aria-expanded="isMobileMenuOpen" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- 移除 id，改用 :class 動態綁定 show class -->
        <div class="collapse navbar-collapse" :class="{ 'show': isMobileMenuOpen }">
            <!-- 電腦版導覽列 -->
            <div class="navbar-menu-container ms-auto d-none d-xl-flex">
                <div class="desktop-nav-items-group">
                    <template v-for="(item, index) in menuItems" :key="item.title">
                        <div class="text-h4 desktop-nav-item-wrapper">
                            <router-link v-if="item.path" :to="item.path" class="desktop-nav-link-custom">{{ item.title }}</router-link>
                            <a v-else class="desktop-nav-link-custom">{{ item.title }}</a>
                            
                            <ul v-if="item.subItems && item.subItems.length > 0" class="desktop-dropdown-menu-custom">
                                <li v-for="subItem in item.subItems" :key="subItem.title">
                                    <router-link :to="subItem.path" class="desktop-dropdown-item-custom text-p">{{ subItem.title }}</router-link>
                                </li>
                            </ul>
                        </div>
                        <div v-if="index < menuItems.length - 1" class="divider"></div>
                    </template>
                </div>
            </div>
            <!-- 手機版導覽列 -->
            <div class="d-xl-none w-100">
                <div class="mobile-nav-items-group">
                    <div v-for="item in menuItems" :key="item.title" class="mobile-nav-item-wrapper">
                        <template v-if="item.subItems && item.subItems.length > 0">
                            <div class="mobile-nav-link text-h3" @click="toggleSubMenu(item.title)">
                                <span class="">{{ item.title }}</span>
                                <span class="mobile-nav-toggle">{{ openItem === item.title ? '−' : '+' }}</span>
                            </div>
                            <div v-if="openItem === item.title" class="text-h4 mobile-submenu">
                                <ul>
                                    <li v-for="subItem in item.subItems" :key="subItem.title">
                                        <!-- 點擊連結後，會觸發 closeMobileMenu -->
                                        <router-link :to="subItem.path" @click="closeMobileMenu">{{ subItem.title }}</router-link>
                                    </li>
                                </ul>
                            </div>
                        </template>
                        <template v-else>
                            <!-- 點擊連結後，會觸發 closeMobileMenu -->
                            <router-link :to="item.path" class="mobile-nav-link text-h3" @click="closeMobileMenu">{{ item.title }}</router-link>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>


<style scoped>
a,
a:hover,
a:focus,
a:active {
    text-decoration: none !important;
    color: inherit;
}

.custom-navbar {
    width: 100%;
    height: 6.25rem;
    box-shadow: 0px 3px 7.7px #4f230030;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--color-orange-500);
    padding: 0;
}

.navbar-brand-custom {
    color: var(--color-white-base) !important;
    margin-left: var(--container-padding);
    z-index: 2;
    white-space: nowrap;
    transition: margin-left 0.3s ease;
}

.navbar-menu-container {
    display: flex;
    align-items: center;
    height: 100%;
    padding-right: calc(var(--container-padding) - 1rem);
    background-color: var(--color-white-base);
    border-top-left-radius: 80px;
    border-bottom-left-radius: 80px;
    padding-left: var(--container-padding);
    transition: padding-right 0.3s ease;
}

.desktop-nav-items-group {
    display: flex;
    align-items: center;
    gap: 20px;
    height: 100%;
}

.desktop-nav-item-wrapper {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
}

.desktop-nav-link-custom {
    color: var(--color-text-primary);
    font-weight: var(--font-weight-bold);
    padding: 1rem;
    transition: color 0.3s ease;
    cursor: pointer;
    line-height: 1.2;
    white-space: nowrap;
}

/* 當路由為當前頁面時，移除 border-bottom-color */
.desktop-nav-link-custom.router-link-exact-active,
.desktop-nav-item-wrapper:hover .desktop-nav-link-custom {
    color: var(--color-orange-500);
    background-color: transparent;
}

.divider {
    width: 1px;
    height: 34px;
    background-color: var(--color-gray-line);
}

.desktop-dropdown-menu-custom {
    display: none;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-white-base);
    border-radius: 15px;
    padding: 0;
    min-width: max-content;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 1021;
    list-style: none;
    border: none;
}

.desktop-nav-item-wrapper:hover .desktop-dropdown-menu-custom {
    display: block;
}

.desktop-dropdown-menu-custom li {
    border-bottom: 2px solid var(--color-gray-line);
    padding: 10px;
}

.desktop-dropdown-menu-custom li:last-child {
    border-bottom: none;
}

.desktop-dropdown-item-custom {
    display: block;
    padding: 15px 35px;
    white-space: nowrap;
    color: var(--color-text-primary);
    text-align: center;
    cursor: pointer;
    transition: color 0.3s ease;
}

.desktop-dropdown-item-custom:hover,
.desktop-dropdown-item-custom.router-link-exact-active {
    color: var(--color-orange-500);
    background-color: transparent;
}

.navbar-toggler {
    margin-right: var(--container-padding);
    border: 2px solid var(--color-gray-area);
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(253, 253, 253, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

/* --- 手機版樣式 --- */
.mobile-nav-item-wrapper {
    border-bottom: 1.5px solid var(--color-gray-area);
}

.mobile-nav-item-wrapper:last-child {
    border-bottom: none;
}

.mobile-nav-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    cursor: pointer;
    color: var(--color-text-primary);
    transition: color 0.3s ease;
}

/* 手機版標題 Hover 效果 */
.mobile-nav-link:hover {
    color: var(--color-orange-500);
}

a.mobile-nav-link {
    justify-content: flex-start;
}

a.mobile-nav-link.router-link-exact-active {
    color: var(--color-orange-500);
}

.mobile-nav-toggle {
    color: var(--color-text-primary);
    line-height: 1;
}

.mobile-submenu {
    background-color: var(--color-gray-area);
    padding: 0.5rem 0 0.5rem 2.5rem;
}

.mobile-submenu ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.mobile-submenu li a {
    display: block;
    padding: 1rem 0;
    color: var(--color-text-primary);
    transition: color 0.3s ease;
}

.mobile-submenu li a:hover,
.mobile-submenu li a.router-link-exact-active {
    color: var(--color-orange-500);
}

@media (max-width: 1400px) {

    .desktop-nav-link-custom {
        font-size: 24px;
        padding: 1rem;
    }

    .desktop-nav-items-group {
        gap: 10px;
    }
}

@media (max-width: 1200px) {

    .navbar-collapse {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: var(--color-white-base);
        padding: 0;
        box-shadow: var(--c-shadow-soft);
        /* border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px; */
    }
}
</style>