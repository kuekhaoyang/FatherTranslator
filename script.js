document.addEventListener('DOMContentLoaded', () => {
    const sourceText = document.getElementById('source-text');
    const targetLanguage = document.getElementById('target-language');
    const translateBtn = document.getElementById('translate-btn');
    const translatedText = document.getElementById('translated-text');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsPage = document.getElementById('settings-page');
    const dimBackground = document.getElementById('dim-background');
    const settingsForm = document.getElementById('settings-form');
    const saveSettingsBtn = document.getElementById('save-settings');
    const cancelSettingsBtn = document.getElementById('cancel-settings');
    const defaultSettingsBtn = document.getElementById('default-settings');
    const modelProvider = document.getElementById('model-provider');
    const modelSelect = document.getElementById('model');
    const apiHost = document.getElementById('api-host');

    const defaultSettings = {
        'model-provider': 'openai',
        'api-key': '',
        'api-host': 'https://api.openai.com/v1',
        'model': 'gpt-4o-mini-2024-07-18',
        'temperature': 0.7,
        'top-p': 1.0,
        'presence-penalty': 0.0,
        'frequency-penalty': 0.0,
        'system-prompt': 'You are a helpful assistant.'
    };

    const modelOptions = {
        openai: [
            'gpt-4o-mini-2024-07-18', 'gpt-4o-mini', 'gpt-4o', 'gpt-4o-2024-05-13', 'gpt-4-turbo', 'gpt-4-turbo-2024-04-09',
            'gpt-4-turbo-preview', 'gpt-4-0125-preview', 'gpt-4-1106-preview', 'gpt-4-vision-preview',
            'gpt-4-1106-vision-preview', 'gpt-4', 'gpt-4-0613', 'gpt-4-32k', 'gpt-4-32k-0613',
            'gpt-3.5-turbo-0125', 'gpt-3.5-turbo', 'gpt-3.5-turbo-1106', 'gpt-3.5-turbo-instruct',
            'gpt-3.5-turbo-16k', 'gpt-3.5-turbo-0613', 'gpt-3.5-turbo-16k-0613'
        ],
        groq: [
            'llama-3.1-405b-reasoning', 'llama-3.1-70b-versatile', 'llama-3.1-8b-instant',
            'llama3-groq-70b-8192-tool-use-preview', 'llama3-groq-8b-8192-tool-use-preview',
            'llama3-70b-8192', 'llama3-8b-8192', 'mixtral-8x7b-32768', 'gemma-7b-it', 'gemma2-9b-it'
        ]
    };

    let settings = { ...defaultSettings };

    function loadSettings() {
        const savedSettings = localStorage.getItem('translatorSettings');
        if (savedSettings) {
            settings = JSON.parse(savedSettings);
        }
        updateSettingsForm();
    }

    function saveSettings() {
        localStorage.setItem('translatorSettings', JSON.stringify(settings));
    }

    function updateSettingsForm() {
        for (const [key, value] of Object.entries(settings)) {
            const element = document.getElementById(key.replace(/([A-Z])/g, '-$1').toLowerCase());
            if (element) {
                element.value = value;
            }
        }
        updateModelOptions();
    }

    function updateModelOptions() {
        const provider = modelProvider.value;
        const models = modelOptions[provider] || [];
        modelSelect.innerHTML = models.map(model => `<option value="${model}">${model}</option>`).join('');
    }

    modelProvider.addEventListener('change', () => {
        settings.modelProvider = modelProvider.value;
        apiHost.value = settings.modelProvider === 'openai' ? 'https://api.openai.com/v1' : 'https://api.groq.com/openai/v1';
        settings.apiHost = apiHost.value;
        updateModelOptions();
    });

    translateBtn.addEventListener('click', async () => {
        const text = sourceText.value.trim();
        const to = targetLanguage.value;

        if (!text) {
            alert('Please enter some text to translate.');
            return;
        }

        translatedText.value = 'Translating...';

        try {
            const response = await fetch(settings.apiHost + '/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${settings.apiKey}`
                },
                body: JSON.stringify({
                    model: settings.model,
                    messages: [
                        { role: "system", content: settings.systemPrompt },
                        { role: "user", content: `Translate the following source text to ${to}, Output translation directly without any additional text.\nSource Text: ${text}\nTranslated Text:` }
                    ],
                    temperature: parseFloat(settings.temperature),
                    top_p: parseFloat(settings.topP),
                    presence_penalty: parseFloat(settings.presencePenalty),
                    frequency_penalty: parseFloat(settings.frequencyPenalty)
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            translatedText.value = data.choices[0].message.content.trim();
        } catch (error) {
            console.error('Error:', error);
            translatedText.value = 'An error occurred while translating. Please check your settings and try again.';
        }
    });

    settingsBtn.addEventListener('click', () => {
        settingsPage.classList.add('open');
        dimBackground.classList.add('active');
    });

    function closeSettings() {
        settingsPage.classList.remove('open');
        dimBackground.classList.remove('active');
    }

    saveSettingsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const formData = new FormData(settingsForm);
        for (const [key, value] of formData.entries()) {
            settings[key.replace(/-./g, x => x[1].toUpperCase())] = value;
        }
        saveSettings();
        closeSettings();
    });

    cancelSettingsBtn.addEventListener('click', () => {
        updateSettingsForm();
        closeSettings();
    });

    defaultSettingsBtn.addEventListener('click', () => {
        settings = { ...defaultSettings };
        updateSettingsForm();
        saveSettings();
    });

    dimBackground.addEventListener('click', closeSettings);

    loadSettings();
});
