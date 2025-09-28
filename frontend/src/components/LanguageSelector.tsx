import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
  };

  return (
    <div className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <select 
        className="bg-transparent text-sm font-medium focus:outline-none"
        onChange={changeLanguage}
        value={i18n.language}
      >
        <option value="en">{t('languages.english')}</option>
        <option value="hi">{t('languages.hindi')}</option>
        <option value="kn">{t('languages.kannada')}</option>
      </select>
    </div>
  );
};

export default LanguageSelector;