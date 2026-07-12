/* ============================================================
   未来电力系统展望 · 交互逻辑
   纯原生 JS，无任何外部依赖
   ============================================================ */

// ========== 1. 移动端汉堡菜单开关 ==========
function toggleMenu() {
    var hamburger = document.getElementById('hamburger');
    var navLinks  = document.getElementById('navLinks');
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
}

// ========== 2. 点击导航链接后关闭移动端菜单 ==========
document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
        var navLinks  = document.getElementById('navLinks');
        var hamburger = document.getElementById('hamburger');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// ========== 3. 平滑滚动到指定区块 ==========
function scrollToSection(id) {
    var section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========== 4. 导航栏滚动高亮当前板块 ==========
var sections  = document.querySelectorAll('section');
var navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function () {
    var current = '';
    sections.forEach(function (section) {
        var sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });

    // 导航栏滚动阴影
    var navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ========== 5. 滚动触发淡入动画 + 进度条填充 ==========
// 使用 IntersectionObserver 监听元素是否进入视口
var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            // 元素进入视口——添加可见类
            entry.target.classList.add('visible');

            // 触发优化卡片进度条填充动画
            var bars = entry.target.querySelectorAll('.opt-bar-fill');
            bars.forEach(function (bar) {
                var width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });

            // 观察一次后取消监听
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

// 对所有带 fade-in 类的元素启动监听
document.querySelectorAll('.fade-in').forEach(function (el) {
    observer.observe(el);
});

// ========== 6. 留言表单提交处理（纯前端弹窗） ==========
function handleSubmit(event) {
    event.preventDefault();
    var name    = document.getElementById('name').value;
    var email   = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // 拼装留言内容
    var content =
        '姓名：' + name + '\n' +
        '邮箱：' + email + '\n' +
        '留言：' + message + '\n\n' +
        '请将以上内容发送至：2724189428@qq.com';

    alert('留言已记录！\n\n' + content + '\n\n（本站为静态页面，请复制以上内容通过邮箱或微信发送）');

    // 清空表单
    document.getElementById('messageForm').reset();
    return false;
}

// ========== 7. Banner 打字机效果 ==========
// 页面加载后对 banner-tag 执行打字机动画
window.addEventListener('load', function () {
    var tagEl = document.querySelector('.banner-tag');
    if (!tagEl) return;

    var fullText = tagEl.textContent;
    tagEl.textContent = '';
    tagEl.style.opacity = '1';

    var i = 0;
    var timer = setInterval(function () {
        if (i < fullText.length) {
            tagEl.textContent += fullText.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, 50);
});
