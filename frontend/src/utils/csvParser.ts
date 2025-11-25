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
  suffix?: string;
  title: string;
  content: string;
  part: string;
}

export const parseIndexCSV = (csvText: string): ConstitutionPart[] => {
  const lines = csvText.split('\n').filter(line => line.trim());
  const parts: ConstitutionPart[] = [];

  const splitCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += ch;
      }
    }
    result.push(current);
    return result.map(cell => cell.trim().replace(/^"|"$/g, ''));
  };
  
  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const fields = splitCSVLine(line);
    const partName = fields[0];
    const subject = fields[1];
    const articleRange = fields[2];
    
    if (!partName || !articleRange || articleRange === '�') continue;
    
    const code = articleRange.replace(/^Article\s+/i, '');
    const [startCode, endCode] = code.split('-');
    const startArticle = parseInt(startCode);
    const endArticle = parseInt(endCode || startCode);
    
    if (!isNaN(startArticle)) {
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
  const normalized = csvText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const firstLineEnd = normalized.indexOf('\n');
  const firstLine = firstLineEnd >= 0 ? normalized.slice(0, firstLineEnd) : normalized;
  const body = /^\d/.test(firstLine) ? normalized : normalized.slice(firstLineEnd + 1);

  const re = /(^|\n)(\d+)([A-Z]{0,2})\.\s*([^\n]+)/g;
  const headers: { index: number; number: number; suffix?: string; title: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) {
    const headingStart = m.index + (m[1] ? m[1].length : 0);
    headers.push({
      index: headingStart,
      number: parseInt(m[2]),
      suffix: m[3] || undefined,
      title: m[4].trim()
    });
  }

  const articles: ConstitutionArticle[] = [];
  for (let i = 0; i < headers.length; i++) {
    const h = headers[i];
    const nextIndex = i + 1 < headers.length ? headers[i + 1].index : body.length;
    const headingText = `${h.number}${h.suffix || ''}. ` + h.title;
    const headingEnd = h.index + headingText.length;
    const content = body.slice(headingEnd, nextIndex).trim();

    articles.push({
      number: h.number,
      suffix: h.suffix,
      title: h.title,
      content,
      part: ''
    });
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
