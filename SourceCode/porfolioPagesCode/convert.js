import fs from 'fs';
import path from 'path';
import sharp from 'sharp'; // 💡 運用網頁界最頂級、速度最快的圖片處理庫

// 🚀 自動定位到妳放生活照的資料夾
const targetDir = path.join(process.cwd(), 'public/pic/life');

if (!fs.existsSync(targetDir)) {
    console.error(`❌ 找不到資料夾：${targetDir}`);
    process.exit(1);
}

// 讀取資料夾內的所有檔案
const files = fs.readdirSync(targetDir);
console.log(`🎬 開始掃描資料夾，共找到 ${files.length} 個項目...`);

let successCount = 0;

for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    
    // 💡 不管大寫 JPEG 還是小寫 jpg，通通一網打盡
    if (ext === '.jpeg' || ext === '.jpg' || ext === '.png') {
        const filePath = path.join(targetDir, file);
        const fileNameWithoutExt = path.basename(file, path.extname(file));
        const outputFilePath = path.join(targetDir, `${fileNameWithoutExt}.webp`);
        
        try {
            // 強制重新編碼並極致壓縮
            await sharp(filePath).webp({ quality: 80 }).toFile(outputFilePath);
            console.log(`✅ 成功轉換：${file} ➜ ${fileNameWithoutExt}.webp`);
            successCount++;
        } catch (err) {
            console.error(`❌ 轉換失敗 [${file}]:`, err.message);
        }
    }
}

console.log(`\n🎉 轉換大功告成！成功轉出 ${successCount} 張 WebP 圖片！`);