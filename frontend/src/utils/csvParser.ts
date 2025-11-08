export interface ConstitutionPart {
  id: string;
  name: string;
  subject: string;
  articleRange: string;
  startArticle: number;
  endArticle: number;
}

export interface ConstitutionArticle {
  number: number;
  title: string;
  content: string;
  part: string;
}

export const parseIndexCSV = (csvText: string): ConstitutionPart[] => {
  const lines = csvText.split('\n').filter(line => line.trim());
  const parts: ConstitutionPart[] = [];
  
  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const [partName, subject, articleRange] = line.split(',').map(cell => 
      cell.replace(/^"|"$/g, '').trim()
    );
    
    if (!partName || !articleRange || articleRange === '�') continue;
    
    // Parse article range (e.g., "Article 1-4" or "Article 52-151")
    const rangeMatch = articleRange.match(/Article\s+(\d+)-(\d+)/);
    if (rangeMatch) {
      const startArticle = parseInt(rangeMatch[1]);
      const endArticle = parseInt(rangeMatch[2]);
      
      parts.push({
        id: partName.toLowerCase().replace(/\s+/g, '-'),
        name: partName,
        subject: subject || '',
        articleRange: articleRange,
        startArticle,
        endArticle
      });
    }
  }
  
  return parts;
};

export const parseConstitutionCSV = (csvText: string): ConstitutionArticle[] => {
  const lines = csvText.split('\n').filter(line => line.trim());
  const articles: ConstitutionArticle[] = [];
  
  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    
    // Parse article number and title
    const articleMatch = line.match(/^(\d+)([A-Z]?)\.\s*(.+?)(?:\n|$)/);
    if (articleMatch) {
      const articleNumber = parseInt(articleMatch[1]);
      const articleSuffix = articleMatch[2] || '';
      const articleTitle = articleMatch[3].trim();
      
      // Get the full content (rest of the line)
      let content = line.substring(line.indexOf(articleMatch[3]) + articleMatch[3].length).trim();
      
      // If content is empty or just a number, get the next line as content
      if (!content || /^\d+$/.test(content)) {
        if (i + 1 < lines.length) {
          content = lines[i + 1].trim();
          i++; // Skip the next line since we used it
        }
      }
      
      articles.push({
        number: articleNumber,
        title: articleTitle,
        content: content,
        part: '' // Will be determined based on article number
      });
    }
  }
  
  return articles;
};

export const assignPartsToArticles = (articles: ConstitutionArticle[], parts: ConstitutionPart[]): ConstitutionArticle[] => {
  return articles.map(article => {
    const matchingPart = parts.find(part => 
      article.number >= part.startArticle && article.number <= part.endArticle
    );
    
    return {
      ...article,
      part: matchingPart?.name || 'Unknown'
    };
  });
};

export const loadCSVData = async (): Promise<{ parts: ConstitutionPart[]; articles: ConstitutionArticle[] }> => {
  try {
    // Load Index.csv
    const indexResponse = await fetch('/Index.csv');
    const indexText = await indexResponse.text();
    const parts = parseIndexCSV(indexText);
    
    // Load Constitution Of India.csv
    const constitutionResponse = await fetch('/Constitution Of India.csv');
    const constitutionText = await constitutionResponse.text();
    const articles = parseConstitutionCSV(constitutionText);
    
    // Assign parts to articles
    const articlesWithParts = assignPartsToArticles(articles, parts);
    
    return { parts, articles: articlesWithParts };
  } catch (error) {
    console.error('Error loading CSV data:', error);
    return { parts: [], articles: [] };
  }
};