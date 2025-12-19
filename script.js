// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links (excluding project links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // 프로젝트 링크는 제외
    if (anchor.classList.contains('project-link')) {
        return;
    }
    
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
        alert('이름, 이메일, 메시지는 필수 입력 항목입니다.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('유효한 이메일 주소를 입력해주세요.');
        return;
    }
    
    // Submit button 상태 변경
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = '전송 중...';
    submitButton.disabled = true;
    
   
    // 또는 Discord 웹훅 사용 시
    const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1451581502688329808/HqBnlRLSMm825guwymvHEzz6LvZum4JfUt-lFSb06HnfEgXUm6iK3vDEAo4BtoJh8cEN'; // Discord 웹훅 URL
    
    // 메시지 포맷팅
    const notificationMessage = `
📧 새로운 포트폴리오 문의가 도착했습니다!

👤 이름: ${name}
📮 이메일: ${email}
${phone ? `📱 전화번호: ${phone}` : ''}

💬 메시지:
${message}

---
포트폴리오 웹사이트에서 전송됨
    `.trim();
    
  
    if (DISCORD_WEBHOOK_URL !== 'YOUR_DISCORD_WEBHOOK_URL') {
        sendToDiscord();
    }
    else {
        // 설정이 안 되어 있는 경우
        alert('⚠️ 알림 설정이 완료되지 않았습니다.\n\n설정 가이드를 참고하여 텔레그램 봇 또는 Discord 웹훅을 설정해주세요.\n\n(현재는 테스트 모드입니다)');
        console.log('전송될 메시지:', notificationMessage);
        contactForm.reset();
    }
    
    function sendToDiscord() {
        fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: notificationMessage
            })
        })
        .then(response => {
            if (response.ok) {
                alert('메시지가 성공적으로 전송되었습니다! 빠른 시일 내에 답변드리겠습니다.');
                contactForm.reset();
            } else {
                throw new Error('Discord 전송 실패');
            }
        })
        .catch((error) => {
            console.error('Discord 전송 실패:', error);
            alert('메시지 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        })
        .finally(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    }
    
    // 최종적으로 버튼 상태 복구 (텔레그램 성공 시)
    if (TELEGRAM_BOT_TOKEN === 'YOUR_TELEGRAM_BOT_TOKEN' || TELEGRAM_CHAT_ID === 'YOUR_TELEGRAM_CHAT_ID') {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Project Modal Functionality
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const projectLinks = document.querySelectorAll('.project-link');

// 프로젝트 데이터
const projectData = {
    1: {
        title: 'E-Commerce 플랫폼',
        description: 'React와 Node.js를 활용한 풀스택 전자상거래 플랫폼입니다. 사용자 인증, 결제 시스템, 상품 관리 기능을 포함합니다.',
        details: '이 프로젝트는 현대적인 전자상거래 솔루션을 제공합니다. React를 사용한 반응형 프론트엔드와 Node.js 기반의 안정적인 백엔드를 구축했습니다. 주요 기능으로는 사용자 인증 및 권한 관리, 실시간 상품 검색, 장바구니 기능, 결제 시스템 통합, 관리자 대시보드 등이 있습니다.',
        tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API'],
        features: [
            '사용자 인증 및 권한 관리',
            '상품 검색 및 필터링',
            '장바구니 및 주문 관리',
            '결제 시스템 통합',
            '관리자 대시보드'
        ]
    },
    2: {
        title: '실시간 채팅 앱',
        description: 'WebSocket을 사용한 실시간 채팅 애플리케이션입니다. 그룹 채팅, 파일 공유, 이모지 지원 등의 기능을 제공합니다.',
        details: 'Socket.io를 활용하여 실시간 양방향 통신을 구현한 채팅 애플리케이션입니다. Vue.js로 직관적인 사용자 인터페이스를 구축하고, Express 서버를 통해 안정적인 백엔드를 제공합니다. 여러 사용자가 동시에 대화할 수 있는 그룹 채팅 기능과 파일 공유 기능을 지원합니다.',
        tags: ['Socket.io', 'Express', 'Vue.js', 'Node.js', 'MongoDB'],
        features: [
            '실시간 메시지 전송',
            '그룹 채팅 및 1:1 채팅',
            '파일 및 이미지 공유',
            '이모지 및 스티커 지원',
            '온라인 상태 표시'
        ]
    },
    3: {
        title: '데이터 분석 대시보드',
        description: '대용량 데이터를 시각화하는 대시보드입니다. 실시간 차트, 필터링, 데이터 내보내기 기능을 포함합니다.',
        details: 'D3.js를 활용하여 인터랙티브한 데이터 시각화 대시보드를 개발했습니다. Python과 Flask를 사용한 백엔드에서 데이터를 처리하고, 실시간으로 업데이트되는 다양한 차트와 그래프를 제공합니다. 사용자는 데이터를 필터링하고, 원하는 형식으로 내보낼 수 있습니다.',
        tags: ['D3.js', 'Python', 'Flask', 'Pandas', 'Chart.js'],
        features: [
            '실시간 데이터 시각화',
            '인터랙티브 차트 및 그래프',
            '데이터 필터링 및 검색',
            '다양한 형식의 데이터 내보내기',
            '반응형 대시보드 디자인'
        ]
    }
};

// 모달 열기
function openModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;
    
    modalBody.innerHTML = `
        <h2 class="modal-title">${project.title}</h2>
        <p class="modal-description">${project.description}</p>
        <div class="modal-details">
            <h3>프로젝트 상세</h3>
            <p>${project.details}</p>
        </div>
        <div class="modal-features">
            <h3>주요 기능</h3>
            <ul>
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        <div class="modal-tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
    `;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// 모달 닫기
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 프로젝트 링크 클릭 이벤트
projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = link.getAttribute('data-project');
        openModal(projectId);
    });
});

// 모달 닫기 버튼 클릭
modalClose.addEventListener('click', closeModal);

// 모달 배경 클릭 시 닫기
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// ESC 키로 모달 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
    }
});

