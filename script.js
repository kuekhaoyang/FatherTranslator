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
        ],
        together: [
            'Nexusflow/NexusRaven-V2-13B', 'bert-base-uncased', 'WizardLM/WizardLM-13B-V1.2',
            'codellama/CodeLlama-34b-Instruct-hf', 'google/gemma-7b', 'upstage/SOLAR-10.7B-Instruct-v1.0',
            'zero-one-ai/Yi-34B', 'togethercomputer/StripedHyena-Hessian-7B', 'teknium/OpenHermes-2-Mistral-7B',
            'mistralai/Mixtral-8x7B-v0.1', 'WhereIsAI/UAE-Large-V1', 'hazyresearch/M2-BERT-2k-Retrieval-Encoder-V1',
            'togethercomputer/Llama-2-7B-32K-Instruct', 'Undi95/ReMM-SLERP-L2-13B', 'meta-llama/Meta-Llama-Guard-3-8B',
            'Undi95/Toppy-M-7B', 'Phind/Phind-CodeLlama-34B-v2', 'stabilityai/stable-diffusion-2-1',
            'openchat/openchat-3.5-1210', 'Austism/chronos-hermes-13b', 'microsoft/phi-2',
            'Qwen/Qwen1.5-0.5B', 'Qwen/Qwen1.5-1.8B', 'Qwen/Qwen1.5-4B', 'Qwen/Qwen1.5-7B',
            'togethercomputer/m2-bert-80M-32k-retrieval', 'snorkelai/Snorkel-Mistral-PairRM-DPO',
            'Qwen/Qwen1.5-7B-Chat', 'Qwen/Qwen1.5-14B', 'Qwen/Qwen1.5-14B-Chat', 'Qwen/Qwen1.5-72B',
            'Qwen/Qwen1.5-1.8B-Chat', 'BAAI/bge-base-en-v1.5', 'Snowflake/snowflake-arctic-instruct',
            'codellama/CodeLlama-13b-Python-hf', 'NousResearch/Nous-Hermes-2-Mixtral-8x7B-SFT',
            'NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO', 'togethercomputer/m2-bert-80M-2k-retrieval',
            'deepseek-ai/deepseek-coder-33b-instruct', 'codellama/CodeLlama-34b-Python-hf',
            'NousResearch/Nous-Hermes-Llama2-13b', 'lmsys/vicuna-13b-v1.5', 'Qwen/Qwen1.5-0.5B-Chat',
            'codellama/CodeLlama-70b-Python-hf', 'codellama/CodeLlama-7b-Instruct-hf',
            'NousResearch/Nous-Hermes-2-Yi-34B', 'codellama/CodeLlama-13b-Instruct-hf',
            'BAAI/bge-large-en-v1.5', 'togethercomputer/Llama-3-8b-chat-hf-int4',
            'meta-llama/Llama-2-13b-hf', 'teknium/OpenHermes-2p5-Mistral-7B',
            'NousResearch/Nous-Capybara-7B-V1p9', 'WizardLM/WizardCoder-Python-34B-V1.0',
            'NousResearch/Nous-Hermes-2-Mistral-7B-DPO', 'togethercomputer/StripedHyena-Nous-7B',
            'togethercomputer/alpaca-7b', 'garage-bAInd/Platypus2-70B-instruct', 'google/gemma-2b',
            'google/gemma-2b-it', 'google/gemma-7b-it', 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
            'allenai/OLMo-7B', 'allenai/OLMo-7B-Twin-2T', 'allenai/OLMo-7B-Instruct',
            'Qwen/Qwen1.5-4B-Chat', 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
            'stabilityai/stable-diffusion-xl-base-1.0', 'Gryphe/MythoMax-L2-13b',
            'meta-llama/Llama-3-70b-chat-hf', 'meta-llama/LlamaGuard-2-8b',
            'mistralai/Mistral-7B-Instruct-v0.1', 'mistralai/Mistral-7B-Instruct-v0.2',
            'mistralai/Mistral-7B-v0.1', 'Open-Orca/Mistral-7B-OpenOrca', 'Qwen/Qwen1.5-32B',
            'NousResearch/Nous-Hermes-llama-2-7b', 'Qwen/Qwen1.5-32B-Chat', 'mistralai/Mixtral-8x22B',
            'Qwen/Qwen2-72B-Instruct', 'Qwen/Qwen1.5-72B-Chat', 'meta-llama/Meta-Llama-3-70B',
            'meta-llama/Llama-3-8b-hf', 'deepseek-ai/deepseek-llm-67b-chat',
            'sentence-transformers/msmarco-bert-base-dot-v5', 'zero-one-ai/Yi-6B',
            'lmsys/vicuna-7b-v1.5', 'togethercomputer/m2-bert-80M-8k-retrieval',
            'meta-llama/Meta-Llama-3-8B', 'microsoft/WizardLM-2-8x22B',
            'togethercomputer/Llama-3-8b-chat-hf-int8', 'wavymulder/Analog-Diffusion',
            'mistralai/Mistral-7B-Instruct-v0.3', 'Qwen/Qwen1.5-110B-Chat',
            'runwayml/stable-diffusion-v1-5', 'prompthero/openjourney', 'meta-llama/Llama-2-7b-hf',
            'SG161222/Realistic_Vision_V3.0_VAE', 'meta-llama/Llama-2-13b-chat-hf',
            'google/gemma-2-27b-it', 'zero-one-ai/Yi-34B-Chat', 'meta-llama/Meta-Llama-3-70B-Instruct-Turbo',
            'meta-llama/Meta-Llama-3-70B-Instruct-Lite', 'google/gemma-2-9b-it', 'google/gemma-2-9b',
            'meta-llama/Llama-3-8b-chat-hf', 'mistralai/Mixtral-8x7B-Instruct-v0.1',
            'codellama/CodeLlama-70b-hf', 'togethercomputer/LLaMA-2-7B-32K', 'databricks/dbrx-instruct',
            'meta-llama/Meta-Llama-3.1-8B-Instruct-Reference', 'meta-llama/Meta-Llama-3-8B-Instruct-Turbo',
            'cognitivecomputations/dolphin-2.5-mixtral-8x7b', 'mistralai/Mixtral-8x22B-Instruct-v0.1',
            'togethercomputer/evo-1-131k-base', 'meta-llama/Llama-2-70b-hf', 'codellama/CodeLlama-70b-Instruct-hf',
            'meta-llama/Meta-Llama-3-8B-Instruct-Lite', 'togethercomputer/evo-1-8k-base',
            'meta-llama/Llama-2-7b-chat-hf', 'meta-llama/Llama-2-70b-chat-hf', 'codellama/CodeLlama-7b-Python-hf',
            'Meta-Llama/Llama-Guard-7b', 'meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo',
            'togethercomputer/Koala-7B', 'Qwen/Qwen2-1.5B-Instruct', 'Qwen/Qwen2-7B-Instruct',
            'NousResearch/Nous-Hermes-13b', 'togethercomputer/guanaco-65b', 'togethercomputer/llama-2-7b',
            'huggyllama/llama-7b', 'lmsys/vicuna-7b-v1.3', 'Qwen/Qwen2-72B', 'Phind/Phind-CodeLlama-34B-Python-v1',
            'NumbersStation/nsql-llama-2-7B', 'NousResearch/Nous-Hermes-Llama2-70b', 'WizardLM/WizardLM-70B-V1.0',
            'huggyllama/llama-65b', 'lmsys/vicuna-13b-v1.5-16k', 'HuggingFaceH4/zephyr-7b-beta',
            'togethercomputer/llama-2-13b', 'togethercomputer/CodeLlama-7b-Instruct', 'togethercomputer/guanaco-13b',
            'togethercomputer/CodeLlama-34b-Python', 'togethercomputer/CodeLlama-34b-Instruct',
            'togethercomputer/CodeLlama-34b', 'togethercomputer/llama-2-70b', 'codellama/CodeLlama-13b-hf',
            'Qwen/Qwen2-7B', 'Qwen/Qwen2-1.5B', 'togethercomputer/CodeLlama-13b-Instruct',
            'togethercomputer/llama-2-13b-chat', 'lmsys/vicuna-13b-v1.3', 'huggyllama/llama-13b',
            'huggyllama/llama-30b', 'togethercomputer/guanaco-33b', 'togethercomputer/Koala-13B',
            'togethercomputer/llama-2-7b-chat', 'togethercomputer/SOLAR-10.7B-Instruct-v1.0-int4',
            'togethercomputer/guanaco-7b', 'EleutherAI/llemma_7b', 'meta-llama/Meta-Llama-3-8B-Instruct',
            'codellama/CodeLlama-34b-hf', 'meta-llama/Meta-Llama-3-70B-Instruct', 'meta-llama/Llama-3-70b-hf',
            'togethercomputer/CodeLlama-7b-Python', 'NousResearch/Hermes-2-Theta-Llama-3-70B',
            'carson/ml318bit', 'togethercomputer/CodeLlama-13b-Python', 'codellama/CodeLlama-7b-hf',
            'togethercomputer/llama-2-70b-chat', 'carson/ml31405bit', 'carson/ml3170bit',
            'carson/mlg38b', 'carson/ml318br', 'meta-llama/Meta-Llama-3.1-8B-Reference',
            'gradientai/Llama-3-70B-Instruct-Gradient-1048k', 'meta-llama/Meta-Llama-3.1-70B-Instruct-Reference'
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
        apiHost.value = settings.modelProvider === 'openai' ? 'https://api.openai.com/v1' : 
                        settings.modelProvider === 'groq' ? 'https://api.groq.com/openai/v1' :
                        'https://api.together.xyz/v1';
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
