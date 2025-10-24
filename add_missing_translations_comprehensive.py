#!/usr/bin/env python3
"""
Add comprehensive missing translations for all languages.
This uses a combination of keeping technical terms in English and providing
culturally appropriate translations for UI text.
"""

import re
import sys

# Read the English translations to use as reference
def extract_english_translations(content):
    """Extract all English key-value pairs"""
    english_section = re.search(r'^en:\s*$(.*?)^[a-z]{2}:\s*$', content, re.MULTILINE | re.DOTALL)
    if not english_section:
        return {}

    english_trans = {}
    for line in english_section.group(1).split('\n'):
        match = re.match(r'\s+(\w+):\s*(.+)', line)
        if match:
            key, value = match.groups()
            # Remove quotes if present
            value = value.strip().strip('"').strip("'")
            english_trans[key] = value

    return english_trans

# Comprehensive translation dictionary
# These are high-quality translations that maintain technical terms appropriately
COMPREHENSIVE_TRANSLATIONS = {
    'stat_label_protocols': {'all': 'SMTP/IMAP/POP3'},

    # Footer translations
    'footer_website_maintained': {
        'ru': 'Веб-сайт',
        'zh': '网站',
        'ja': 'ウェブサイト',
        'hi': 'वेबसाइट',
        'fr': 'Site web',
        'de': 'Website',
        'it': 'Sito web',
        'es': 'Sitio web',
        'pt': 'Site',
        'da': 'Websted',
        'sv': 'Webbplats',
        'is': 'Vefsíða',
        'bg': 'Уебсайт',
        'ro': 'Site web',
        'hu': 'Weboldal',
        'be': 'Вэб-сайт',
        'fa': 'وب‌سایت',
        'ar': 'الموقع',
        'ko': '웹사이트',
        'sr': 'Веб сајт'
    },

    'footer_website_maintained_text': {
        'ru': 'поддерживается',
        'zh': '由维护',
        'ja': 'によって管理されています',
        'hi': 'द्वारा रखरखाव किया जाता है',
        'fr': 'est maintenu par',
        'de': 'wird gewartet von',
        'it': 'è mantenuto da',
        'es': 'es mantenido por',
        'pt': 'é mantido por',
        'da': 'vedligeholdes af',
        'sv': 'underhålls av',
        'is': 'er viðhaldið af',
        'bg': 'се поддържа от',
        'ro': 'este întreținut de',
        'hu': 'karbantartja',
        'be': 'падтрымліваецца',
        'fa': 'توسط نگهداری می‌شود',
        'ar': 'يتم صيانته بواسطة',
        'ko': '에 의해 유지 관리됨',
        'sr': 'одржава'
    },

    'footer_server_factory': {
        'all': 'Server Factory'
    },

    'footer_generated_by': {
        'ru': 'Эта страница создана с помощью',
        'zh': '此页面由生成',
        'ja': 'このページは次によって生成されました',
        'hi': 'यह पृष्ठ द्वारा उत्पन्न किया गया था',
        'fr': 'Cette page a été générée par',
        'de': 'Diese Seite wurde generiert von',
        'it': 'Questa pagina è stata generata da',
        'es': 'Esta página fue generada por',
        'pt': 'Esta página foi gerada por',
        'da': 'Denne side blev genereret af',
        'sv': 'Denna sida genererades av',
        'is': 'Þessi síða var búin til af',
        'bg': 'Тази страница е генерирана от',
        'ro': 'Această pagină a fost generată de',
        'hu': 'Ezt az oldalt generálta',
        'be': 'Гэта старонка створана з дапамогай',
        'fa': 'این صفحه توسط ایجاد شده است',
        'ar': 'تم إنشاء هذه الصفحة بواسطة',
        'ko': '이 페이지는 다음에 의해 생성되었습니다',
        'sr': 'Ову страницу је генерисао'
    },

    'footer_github_pages': {
        'all': 'GitHub Pages'
    },

    'logo_alt': {
        'ru': 'Логотип Mail Server Factory',
        'zh': 'Mail Server Factory 标志',
        'ja': 'Mail Server Factoryのロゴ',
        'hi': 'Mail Server Factory लोगो',
        'fr': 'Logo Mail Server Factory',
        'de': 'Mail Server Factory Logo',
        'it': 'Logo Mail Server Factory',
        'es': 'Logotipo de Mail Server Factory',
        'pt': 'Logotipo do Mail Server Factory',
        'da': 'Mail Server Factory logo',
        'sv': 'Mail Server Factory logotyp',
        'is': 'Mail Server Factory merki',
        'bg': 'Лого на Mail Server Factory',
        'ro': 'Logo Mail Server Factory',
        'hu': 'Mail Server Factory logó',
        'be': 'Лагатып Mail Server Factory',
        'fa': 'لوگوی Mail Server Factory',
        'ar': 'شعار Mail Server Factory',
        'ko': 'Mail Server Factory 로고',
        'sr': 'Mail Server Factory логотип'
    },

    'logo_alt_home': {
        'ru': 'Mail Server Factory - Запустите свой почтовый сервер как босс!',
        'zh': 'Mail Server Factory - 像老板一样运行您的邮件服务器！',
        'ja': 'Mail Server Factory - ボスのようにメールサーバーを実行しましょう！',
        'hi': 'Mail Server Factory - अपना मेल सर्वर बॉस की तरह चलाएं!',
        'fr': 'Mail Server Factory - Exécutez votre serveur de messagerie comme un patron!',
        'de': 'Mail Server Factory - Betreiben Sie Ihren Mail-Server wie ein Chef!',
        'it': 'Mail Server Factory - Gestisci il tuo server di posta come un capo!',
        'es': 'Mail Server Factory - ¡Ejecuta tu servidor de correo como un jefe!',
        'pt': 'Mail Server Factory - Execute seu servidor de e-mail como um chefe!',
        'da': 'Mail Server Factory - Kør din mailserver som en boss!',
        'sv': 'Mail Server Factory - Kör din e-postserver som en chef!',
        'is': 'Mail Server Factory - Keyrðu póstþjóninn þinn eins og stjórnandi!',
        'bg': 'Mail Server Factory - Управлявайте пощенския си сървър като шеф!',
        'ro': 'Mail Server Factory - Rulează serverul tău de mail ca un șef!',
        'hu': 'Mail Server Factory - Futtassa levelező szerverét főnökként!',
        'be': 'Mail Server Factory - Запусціце свой паштовы сервер як бос!',
        'fa': 'Mail Server Factory - سرور ایمیل خود را مانند یک رئیس اجرا کنید!',
        'ar': 'Mail Server Factory - قم بتشغيل خادم البريد الخاص بك مثل الرئيس!',
        'ko': 'Mail Server Factory - 보스처럼 메일 서버를 실행하세요!',
        'sr': 'Mail Server Factory - Покрените ваш мејл сервер као шеф!'
    },

    'footer_opensource': {
        'ru': 'Открытый исходный код • Бесплатно навсегда • Поддержка сообщества',
        'zh': '开源 • 永久免费 • 社区支持',
        'ja': 'オープンソース • 永久無料 • コミュニティサポート',
        'hi': 'ओपन सोर्स • हमेशा के लिए मुफ्त • समुदाय समर्थित',
        'fr': 'Open source • Gratuit pour toujours • Soutenu par la communauté',
        'de': 'Open Source • Kostenlos für immer • Community unterstützt',
        'it': 'Open source • Gratuito per sempre • Supporto della comunità',
        'es': 'Código abierto • Gratis para siempre • Con soporte de la comunidad',
        'pt': 'Código aberto • Grátis para sempre • Apoiado pela comunidade',
        'da': 'Open source • Gratis for evigt • Fællesskabsstøttet',
        'sv': 'Öppen källkod • Gratis för alltid • Gemenskapsstödd',
        'is': 'Opinn hugbúnaður • Ókeypis að eilífu • Stuðningur frá samfélaginu',
        'bg': 'Отворен код • Безплатно завинаги • Поддръжка от общността',
        'ro': 'Open source • Gratuit pentru totdeauna • Suport comunitate',
        'hu': 'Nyílt forráskód • Ingyenes örökre • Közösségi támogatás',
        'be': 'Адкрыты зыходны код • Бясплатна назаўжды • Падтрымка супольнасці',
        'fa': 'منبع باز • رایگان برای همیشه • پشتیبانی جامعه',
        'ar': 'مفتوح المصدر • مجاني إلى الأبد • مدعوم من المجتمع',
        'ko': '오픈 소스 • 영원히 무료 • 커뮤니티 지원',
        'sr': 'Отворени извор • Бесплатно заувек • Подршка заједнице'
    },

   'theme_toggle': {
        'ru': 'Переключить тему',
        'zh': '切换主题',
        'ja': 'テーマを切り替え',
        'hi': 'थीम टॉगल करें',
        'fr': 'Basculer le thème',
        'de': 'Design wechseln',
        'it': 'Cambia tema',
        'es': 'Cambiar tema',
        'pt': 'Alternar tema',
        'da': 'Skift tema',
        'sv': 'Växla tema',
        'is': 'Skipta um þema',
        'bg': 'Превключване на тема',
        'ro': 'Comutare temă',
        'hu': 'Téma váltás',
        'be': 'Пераключыць тэму',
        'fa': 'تغییر پوسته',
        'ar': 'تبديل السمة',
        'ko': '테마 전환',
        'sr': 'Промените тему'
    },

    'select_language': {
        'ru': 'Выбрать язык',
        'zh': '选择语言',
        'ja': '言語を選択',
        'hi': 'भाषा चुनें',
        'fr': 'Sélectionner la langue',
        'de': 'Sprache auswählen',
        'it': 'Seleziona lingua',
        'es': 'Seleccionar idioma',
        'pt': 'Selecionar idioma',
        'da': 'Vælg sprog',
        'sv': 'Välj språk',
        'is': 'Velja tungumál',
        'bg': 'Избор на език',
        'ro': 'Selectează limba',
        'hu': 'Nyelv kiválasztása',
        'be': 'Абраць мову',
        'fa': 'انتخاب زبان',
        'ar': 'اختر اللغة',
        'ko': '언어 선택',
        'sr': 'Изаберите језик'
    },

    'page_description': {
        'ru': 'Разверните готовую к продакшену инфраструктуру почтового сервера без лишних хлопот',
        'zh': '轻松部署生产就绪的邮件服务器基础设施',
        'ja': '本番環境対応のメールサーバーインフラストラクチャを手間なくデプロイ',
        'hi': 'बिना किसी परेशानी के उत्पादन-तैयार मेल सर्वर इंफ्रास्ट्रक्चर को तैनात करें',
        'fr': 'Déployez une infrastructure de serveur de messagerie prête pour la production sans tracas',
        'de': 'Produktionsbereite Mail-Server-Infrastruktur ohne Aufwand bereitstellen',
        'it': 'Distribuisci infrastruttura server di posta pronta per la produzione senza problemi',
        'es': 'Implemente infraestructura de servidor de correo lista para producción sin complicaciones',
        'pt': 'Implante infraestrutura de servidor de email pronta para produção sem complicações',
        'da': 'Implementer produktionsklar mailserverinfrastruktur uden besvær',
        'sv': 'Distribuera produktionsklar e-postserverinfrastruktur utan krångel',
        'is': 'Settu upp framleiðslutilbúinn póstþjón án erfiðleika',
        'bg': 'Разгърнете готова за производство пощенска сървърна инфраструктура без усилия',
        'ro': 'Implementează infrastructură server de email gata pentru producție fără bătăi de cap',
        'hu': 'Telepítsen éles környezetre kész levelezőszerver-infrastruktúrát gond nélkül',
        'be': 'Разгарніце гатовую да вытворчасці інфраструктуру паштовага сервера без лішніх клопатаў',
        'fa': 'زیرساخت سرور ایمیل آماده تولید را بدون دردسر مستقر کنید',
        'ar': 'نشر بنية تحتية لخادم البريد جاهزة للإنتاج بدون متاعب',
        'ko': '번거로움 없이 프로덕션 준비 메일 서버 인프라를 배포하세요',
        'sr': 'Имплементирајте производну инфраструктуру мејл сервера без муке'
    }
}

def add_missing_translation(content, lang_code, key, value):
    """Add a missing translation to a language section"""
    # Find the language section
    lang_pattern = rf'^{lang_code}:\s*$'
    lang_match = re.search(lang_pattern, content, re.MULTILINE)

    if not lang_match:
        print(f"Warning: Could not find language section for {lang_code}")
        return content

    # Check if key already exists
    section_start = lang_match.end()
    next_lang_pattern = r'^[a-z]{2}:\s*$'
    next_match = re.search(next_lang_pattern, content[section_start:], re.MULTILINE)

    if next_match:
        section_end = section_start + next_match.start()
    else:
        section_end = len(content)

    section = content[section_start:section_end]

    # Check if key exists
    key_pattern = rf'^\s+{re.escape(key)}:'
    if re.search(key_pattern, section, re.MULTILINE):
        # Key exists, update it if it's a placeholder
        placeholder_pattern = rf'(^\s+{re.escape(key)}:\s*).*(\[{lang_code.upper()}\].*|{re.escape(key)}.*)'
        if re.search(placeholder_pattern, section, re.MULTILINE | re.IGNORECASE):
            # Replace placeholder
            section = re.sub(
                placeholder_pattern,
                f'\\1{value}',
                section,
                count=1,
                flags=re.MULTILINE | re.IGNORECASE
            )
            content = content[:section_start] + section + content[section_end:]
            print(f"Updated {lang_code}.{key}")
    else:
        # Key doesn't exist, add it
        # Add at the end of the section
        insert_pos = section_end - 1
        while insert_pos > section_start and content[insert_pos] in '\n \t':
            insert_pos -= 1
        insert_pos += 1

        new_line = f"  {key}: {value}\n"
        content = content[:insert_pos] + new_line + content[insert_pos:]
        print(f"Added {lang_code}.{key}")

    return content

def main():
    print("Adding comprehensive missing translations...")

    with open('_data/translations.yml', 'r', encoding='utf-8') as f:
        content = f.read()

    # Get all languages except English
    languages = re.findall(r'^([a-z]{2}):\s*$', content, re.MULTILINE)
    languages = [lang for lang in languages if lang != 'en']

    print(f"Found {len(languages)} non-English languages: {', '.join(languages)}")

    # Add translations for each language
    for key, translations in COMPREHENSIVE_TRANSLATIONS.items():
        for lang in languages:
            if 'all' in translations:
                value = translations['all']
            elif lang in translations:
                value = translations[lang]
            else:
                continue  # Skip if no translation available

            content = add_missing_translation(content, lang, key, value)

    # Write back
    with open('_data/translations.yml', 'w', encoding='utf-8') as f:
        f.write(content)

    print("\nTranslation update complete!")
    print(f"Added/updated translations for {len(COMPREHENSIVE_TRANSLATIONS)} keys across {len(languages)} languages")

if __name__ == '__main__':
    main()
