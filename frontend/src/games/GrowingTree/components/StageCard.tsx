import React from 'react';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

interface Resource { label: string; href: string; }

interface Question {
  q: string;
  options: string[];
  answer: string;
}

export interface StageData {
  id: string;
  title: string;
  dates: string;
  summary: string;
  fullText: string;
  image: string;
  questions: Question[];
  resources?: Resource[];
}

interface Props {
  stage: StageData;
  disabled?: boolean;
  onStudy: () => void;
  onTakeQuiz: () => void;
}

const StageCard: React.FC<Props> = ({ stage, disabled, onTakeQuiz }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card className="constitutional-card">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <img src={stage.image} alt={stage.title} className="w-28 h-28 object-cover rounded" />
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-1">{stage.title}</h2>
            <p className="text-sm text-muted-foreground mb-2">{stage.dates}</p>
            <p className="text-sm mb-2">{stage.summary}</p>
            {expanded && (
              <div className="text-sm text-muted-foreground mb-2 whitespace-pre-line">
                {stage.fullText}
              </div>
            )}
            {stage.resources && stage.resources.length > 0 && (
              <div className="mt-2">
                <span className="text-xs font-semibold">Resources:</span>
                <ul className="list-disc ml-5 text-xs text-muted-foreground">
                  {stage.resources.map((r,i)=>(
                    <li key={i}><a className="underline" href={r.href} target="_blank" rel="noreferrer">{r.label}</a></li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-4 flex items-center gap-2">
              <Button variant="outline" onClick={()=>setExpanded(e=>!e)} aria-label={expanded ? 'Collapse details' : 'Expand details'}>
                {expanded ? 'Hide Details' : 'Learn More'}
              </Button>
              <Button className="btn-saffron" onClick={onTakeQuiz} disabled={disabled} aria-label="Take Quiz">
                Take Quiz
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StageCard;
