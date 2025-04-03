/**
 * ホテルコンシェルジュ JavaScript
 * 言語切り替えとユーザー操作を処理します
 */

document.addEventListener('DOMContentLoaded', function() {
    // 要素の参照を取得
    const jpButton = document.getElementById('jpButton');
    const enButton = document.getElementById('enButton');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const optionCards = document.querySelectorAll('.option-card');
    const questionTitle = document.querySelector('.question-title');
    
    // 現在の言語状態（デフォルトは英語）
    let currentLang = localStorage.getItem('preferredLanguage') || 'en';
    
    // 言語設定に基づいてUIを更新
    if (currentLang === 'en') {
        document.body.classList.add('lang-en');
        document.body.classList.remove('lang-ja');
        messageInput.placeholder = 'Type a message...';
        if (questionTitle) {
            questionTitle.textContent = questionTitle.getAttribute('data-lang-en') || questionTitle.textContent;
        }
    } else {
        document.body.classList.add('lang-ja');
        document.body.classList.remove('lang-en');
        messageInput.placeholder = 'メッセージを入力...';
        if (questionTitle) {
            questionTitle.textContent = questionTitle.getAttribute('data-lang-ja') || questionTitle.textContent;
        }
    }
    
    // 日本語ボタンのクリックイベント
    jpButton.addEventListener('click', function() {
        // 日本語メッセージを入力欄に設定
        messageInput.value = "日本語で会話します";
        messageInput.focus();
        
        // 言語設定を更新
        currentLang = 'ja';
        localStorage.setItem('preferredLanguage', 'ja');
        document.body.classList.add('lang-ja');
        document.body.classList.remove('lang-en');
        messageInput.placeholder = 'メッセージを入力...';
        
        // カーソルを末尾に移動
        messageInput.selectionStart = messageInput.value.length;
        messageInput.selectionEnd = messageInput.value.length;
        
        // 質問タイトルを更新
        if (questionTitle) {
            questionTitle.textContent = questionTitle.getAttribute('data-lang-ja') || questionTitle.textContent;
        }
        
        console.log('言語を日本語に切り替えました');
    });
    
    // 英語ボタンのクリックイベント
    enButton.addEventListener('click', function() {
        // 英語メッセージを入力欄に設定
        messageInput.value = "Speak in English";
        messageInput.focus();
        
        // 言語設定を更新
        currentLang = 'en';
        localStorage.setItem('preferredLanguage', 'en');
        document.body.classList.add('lang-en');
        document.body.classList.remove('lang-ja');
        messageInput.placeholder = 'Type a message...';
        
        // カーソルを末尾に移動
        messageInput.selectionStart = messageInput.value.length;
        messageInput.selectionEnd = messageInput.value.length;
        
        // 質問タイトルを更新
        if (questionTitle) {
            questionTitle.textContent = questionTitle.getAttribute('data-lang-en') || questionTitle.textContent;
        }
        
        console.log('言語を英語に切り替えました');
    });
    
    // オプションカードのクリックイベント
    optionCards.forEach(card => {
        card.addEventListener('click', function() {
            const option = this.getAttribute('data-option');
            handleOptionSelection(option);
            console.log('選択されたオプション:', option);
        });
    });
    
    // オプション選択を処理する関数
    function handleOptionSelection(option) {
        let message = '';
        
        // 選択したオプションに基づいてメッセージを設定
        switch(option) {
            case 'facilities':
                message = currentLang === 'ja' ? 'ホテル施設について教えてください' : 'Tell me about hotel facilities';
                break;
            case 'dining':
                message = currentLang === 'ja' ? 'レストラン情報が知りたい' : 'I want to know about dining options';
                break;
            case 'medical':
                message = currentLang === 'ja' ? '医療サポートが必要です' : 'I need medical assistance';
                break;
            case 'sightseeing':
                message = currentLang === 'ja' ? '周辺の観光スポットを教えてください' : 'What are the local attractions?';
                break;
            default:
                console.log('不明なオプション:', option);
                return;
        }
        
        // メッセージを入力欄に設定
        messageInput.value = message;
        
        // 入力欄にフォーカス
        messageInput.focus();
    }
    
    // メッセージ送信ボタンのクリックイベント
    if (sendButton) {
        sendButton.addEventListener('click', function() {
            sendMessage();
        });
    }
    
    // Enterキーでメッセージを送信
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    // メッセージ送信処理
    function sendMessage() {
        const message = messageInput.value.trim();
        
        if (message !== '') {
            console.log('送信メッセージ:', message);
            
            // 言語選択メッセージの場合
            if (message === "日本語で会話します") {
                localStorage.setItem('preferredLanguage', 'ja');
                messageInput.value = '';
                alert('日本語モードに設定しました');
                return;
            } else if (message === "Speak in English") {
                localStorage.setItem('preferredLanguage', 'en');
                messageInput.value = '';
                alert('English mode selected');
                return;
            }
            
            // 入力欄をクリア
            messageInput.value = '';
            
            // チャット画面に移行
            window.location.href = 'chat.html';
        }
    }
    
    console.log('app.js が正常に読み込まれました');
});