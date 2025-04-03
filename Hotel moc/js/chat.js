/**
 * ホテルコンシェルジュ チャット JavaScript
 * チャット画面の機能を処理します
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('chat.js が読み込まれました');
    
    // 要素の参照を取得
    const backButton = document.getElementById('backButton');
    const jpButton = document.getElementById('jpButton');
    const enButton = document.getElementById('enButton');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');
    const toolButtons = document.querySelectorAll('.tool-button');
    const homeButton = document.getElementById('homeButton');
    
    // 現在の言語状態を取得（ローカルストレージから読み込み、デフォルトは英語）
    let currentLang = localStorage.getItem('preferredLanguage') || 'en';
    
    console.log('現在の言語設定:', currentLang);
    
    // 言語設定に基づいてUIを更新
    if (currentLang === 'en') {
        document.body.classList.add('lang-en');
        document.body.classList.remove('lang-ja');
        messageInput.placeholder = 'Type a message...';
    } else {
        document.body.classList.add('lang-ja');
        document.body.classList.remove('lang-en');
        messageInput.placeholder = 'メッセージを入力...';
    }
    
    // ツールボタンのラベルを更新
    updateToolLabels();
    
    // 戻るボタンのクリックイベント
    if (backButton) {
        backButton.addEventListener('click', function() {
            console.log('戻るボタンがクリックされました');
            window.location.href = 'index.html';
        });
    }
    
    // ホームボタンのクリックイベント
    if (homeButton) {
        homeButton.addEventListener('click', function() {
            console.log('ホームボタンがクリックされました');
            window.location.href = 'index.html';
        });
    }
    
    // 日本語ボタンのクリックイベント
    if (jpButton) {
        jpButton.addEventListener('click', function() {
            console.log('日本語ボタンがクリックされました');
            
            // 現在の日時を取得
            const now = new Date();
            const time = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes());
            
            // システムメッセージを追加
            addSystemMessage('日本語でご案内いたします。滞在中のお手伝いはどのようなことでしょうか？');
            
            // 言語設定を更新
            currentLang = 'ja';
            localStorage.setItem('preferredLanguage', 'ja');
            document.body.classList.add('lang-ja');
            document.body.classList.remove('lang-en');
            messageInput.placeholder = 'メッセージを入力...';
            
            // ツールボタンのラベルを更新
            updateToolLabels();
        });
    }
    
    // 英語ボタンのクリックイベント
    if (enButton) {
        enButton.addEventListener('click', function() {
            console.log('英語ボタンがクリックされました');
            
            // システムメッセージを追加
            addSystemMessage('I will communicate in English. How may I assist you during your stay?');
            
            // 言語設定を更新
            currentLang = 'en';
            localStorage.setItem('preferredLanguage', 'en');
            document.body.classList.add('lang-en');
            document.body.classList.remove('lang-ja');
            messageInput.placeholder = 'Type a message...';
            
            // ツールボタンのラベルを更新
            updateToolLabels();
        });
    }
    
    // ツールボタンのラベルを更新する関数
    function updateToolLabels() {
        toolButtons.forEach(button => {
            const label = button.querySelector('.tool-label');
            if (label) {
                const langAttribute = currentLang === 'ja' ? 'data-lang-ja' : 'data-lang-en';
                const newText = label.getAttribute(langAttribute);
                
                if (newText) {
                    label.textContent = newText;
                }
            }
        });
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
            
            // 現在の日時を取得
            const now = new Date();
            const time = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes());
            
            // ユーザーメッセージをチャットに追加
            addMessage('user', message, time);
            
            // 入力欄をクリア
            messageInput.value = '';
            
            // サーバーへ送信するロジックをここに追加
            // 実際のアプリではAPIリクエストを行う
            
            // 仮のレスポンスをシミュレート（実際のアプリではサーバーからのレスポンスを使用）
            setTimeout(() => {
                const response = getSimulatedResponse(message);
                addMessage('assistant', response, time);
                
                // スクロールを最下部に移動
                scrollToBottom();
            }, 500);
        }
    }
    
    // メッセージをチャットに追加する関数
    function addMessage(type, text, time) {
        // メッセージコンテナを作成
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        // メッセージコンテンツを作成
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const messagePara = document.createElement('p');
        messagePara.textContent = text;
        
        if (type === 'assistant') {
            // アシスタントのメッセージには言語データ属性を追加
            messagePara.setAttribute('data-lang-ja', text);
            
            // 英語版のテキストも用意（実際のアプリでは翻訳APIなどを使用）
            const enText = simulateTranslation(text);
            messagePara.setAttribute('data-lang-en', enText);
        }
        
        contentDiv.appendChild(messagePara);
        
        // 時間表示を作成
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = time;
        
        // 要素を追加
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        
        // チャットエリアに追加
        chatMessages.appendChild(messageDiv);
        
        // スクロールを最下部に移動
        scrollToBottom();
    }
    
    // チャットを最下部にスクロールする関数
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // ツールアクションを処理する関数
    function handleToolAction(tool) {
        // ホームボタンの場合、インデックスページに戻る
        if (tool === 'home') {
            window.location.href = 'index.html';
        }
    }
    
    // システムメッセージを追加する関数
    function addSystemMessage(message) {
        // 現在の日時を取得
        const now = new Date();
        const time = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes());
        
        // メッセージをチャットに追加
        addMessage('assistant', message, time);
    }
    
    // シミュレートした応答を取得する関数（実際のアプリではAPIレスポンスを使用）
    function getSimulatedResponse(message) {
        // 簡単なキーワードに基づく応答
        if (message.includes('こんにちは') || message.includes('hello')) {
            return currentLang === 'ja' ? 
                'こんにちは！ホテルでの滞在はいかがですか？何かお手伝いできることはありますか？' : 
                'Hello! How is your stay with us? How can I assist you today?';
        }
        
        if (message.includes('施設') || message.includes('facilities')) {
            return currentLang === 'ja' ? 
                '当ホテルには以下の施設がございます：24時間フィットネスセンター（2階）、屋上プール（10階）、スパ（3階）、ビジネスセンター（ロビー階）。ご利用時間やその他の詳細についてお知りになりたい施設はありますか？' : 
                'Our hotel offers the following facilities: 24-hour fitness center (2nd floor), rooftop pool (10th floor), spa (3rd floor), and business center (lobby level). Would you like to know more about opening hours or any specific facility?';
        }
        
        if (message.includes('レストラン') || message.includes('dining') || message.includes('食事')) {
            return currentLang === 'ja' ? 
                '当ホテル内には3つのレストランがございます：「アズール」（1階、国際料理、6:00-23:00）、「藤」（9階、日本料理、11:30-14:30、17:30-22:00）、「ラ・ヴィスタ」（屋上階、イタリアン、18:00-23:00）。ご予約は内線9番でコンシェルジュデスクまでお申し付けください。また、周辺のレストラン情報もご案内可能です。' : 
                'We have 3 restaurants in the hotel: "Azur" (1st floor, international cuisine, 6:00-23:00), "Fuji" (9th floor, Japanese cuisine, 11:30-14:30, 17:30-22:00), and "La Vista" (rooftop, Italian cuisine, 18:00-23:00). For reservations, please contact the concierge desk at extension 9. We can also provide information about restaurants in the surrounding area.';
        }
        
        if (message.includes('医療') || message.includes('病院') || message.includes('medical')) {
            return currentLang === 'ja' ? 
                '体調が優れませんか？ホテル内には医務室（2階）があり、平日9:00-18:00まで看護師が常駐しています。緊急の場合や時間外は、フロントデスク（内線0）にお申し付けください。最寄りの総合病院は徒歩10分の「セントラル病院」で、24時間対応しています。タクシーの手配も承ります。' : 
                'Are you feeling unwell? We have a medical room on the 2nd floor with a nurse available weekdays from 9:00-18:00. For emergencies or after hours, please contact the front desk (extension 0). The nearest general hospital is "Central Hospital," a 10-minute walk away, which is open 24 hours. We can also arrange a taxi for you.';
        }
        
        if (message.includes('観光') || message.includes('attractions') || message.includes('sightseeing')) {
            return currentLang === 'ja' ? 
                '周辺の主な観光スポットには以下があります：市立美術館（徒歩15分）、歴史博物館（地下鉄で3駅）、中央公園（徒歩10分）、旧市街地区（地下鉄で2駅）。観光マップはフロントデスクでご用意しています。また、ガイド付きツアーのご予約も承っておりますが、ご興味はありますか？' : 
                'Major attractions in the area include: City Art Museum (15-minute walk), Historical Museum (3 subway stops), Central Park (10-minute walk), and Old Town District (2 subway stops). Tourist maps are available at the front desk. Would you be interested in booking a guided tour? We can arrange this for you.';
        }
        
        // デフォルトの応答
        return currentLang === 'ja' ? 
            'ありがとうございます。他にご質問やご要望はございますか？ホテル滞在中のお手伝いをさせていただきます。' : 
            'Thank you. Do you have any other questions or requests? I am here to assist you during your stay.';
    }
    
    // テキストの簡易翻訳をシミュレートする関数（実際のアプリでは翻訳APIを使用）
    function simulateTranslation(text) {
        // 日本語テキストに対応する英語テキストの簡易マッピング
        const translations = {
            'こんにちは！ホテルコンシェルジュです。滞在をより快適にするお手伝いをいたします。何かご質問はありますか？': 
                'Hello! I\'m your Hotel Concierge. How can I help make your stay more comfortable?',
            '日本語でご案内いたします。滞在中のお手伝いはどのようなことでしょうか？': 
                'I will communicate in Japanese. How may I assist you during your stay?',
            'こんにちは！ホテルでの滞在はいかがですか？何かお手伝いできることはありますか？': 
                'Hello! How is your stay with us? How can I assist you today?',
            '当ホテルには以下の施設がございます：24時間フィットネスセンター（2階）、屋上プール（10階）、スパ（3階）、ビジネスセンター（ロビー階）。ご利用時間やその他の詳細についてお知りになりたい施設はありますか？': 
                'Our hotel offers the following facilities: 24-hour fitness center (2nd floor), rooftop pool (10th floor), spa (3rd floor), and business center (lobby level). Would you like to know more about opening hours or any specific facility?',
            '当ホテル内には3つのレストランがございます：「アズール」（1階、国際料理、6:00-23:00）、「藤」（9階、日本料理、11:30-14:30、17:30-22:00）、「ラ・ヴィスタ」（屋上階、イタリアン、18:00-23:00）。ご予約は内線9番でコンシェルジュデスクまでお申し付けください。また、周辺のレストラン情報もご案内可能です。': 
                'We have 3 restaurants in the hotel: "Azur" (1st floor, international cuisine, 6:00-23:00), "Fuji" (9th floor, Japanese cuisine, 11:30-14:30, 17:30-22:00), and "La Vista" (rooftop, Italian cuisine, 18:00-23:00). For reservations, please contact the concierge desk at extension 9. We can also provide information about restaurants in the surrounding area.',
            '体調が優れませんか？ホテル内には医務室（2階）があり、平日9:00-18:00まで看護師が常駐しています。緊急の場合や時間外は、フロントデスク（内線0）にお申し付けください。最寄りの総合病院は徒歩10分の「セントラル病院」で、24時間対応しています。タクシーの手配も承ります。': 
                'Are you feeling unwell? We have a medical room on the 2nd floor with a nurse available weekdays from 9:00-18:00. For emergencies or after hours, please contact the front desk (extension 0). The nearest general hospital is "Central Hospital," a 10-minute walk away, which is open 24 hours. We can also arrange a taxi for you.',
            '周辺の主な観光スポットには以下があります：市立美術館（徒歩15分）、歴史博物館（地下鉄で3駅）、中央公園（徒歩10分）、旧市街地区（地下鉄で2駅）。観光マップはフロントデスクでご用意しています。また、ガイド付きツアーのご予約も承っておりますが、ご興味はありますか？': 
                'Major attractions in the area include: City Art Museum (15-minute walk), Historical Museum (3 subway stops), Central Park (10-minute walk), and Old Town District (2 subway stops). Tourist maps are available at the front desk. Would you be interested in booking a guided tour? We can arrange this for you.',
            'ありがとうございます。他にご質問やご要望はございますか？ホテル滞在中のお手伝いをさせていただきます。': 
                'Thank you. Do you have any other questions or requests? I am here to assist you during your stay.'
        };
        
        // マッピングにあれば翻訳を返し、なければそのまま返す
        return translations[text] || text;
    }
    
    // ツールボタンのクリックイベントリスナーを追加
    toolButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tool = this.getAttribute('data-tool');
            handleToolAction(tool);
        });
    });
    
    // 初期化時にスクロールを最下部に設定
    scrollToBottom();
});