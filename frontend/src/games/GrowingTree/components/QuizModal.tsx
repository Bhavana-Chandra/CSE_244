import React from 'react';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import type { StageData } from './StageCard';

interface Props {
  open: boolean;
  stage: StageData;
  onClose: () => void;
  onCorrect: () => void;
  onIncorrect: (explanation: string, image?: string) => void;
}

const QuizModal: React.FC<Props> = ({ open, stage, onClose, onCorrect, onIncorrect }) => {
  const [answers, setAnswers] = React.useState<Record<number,string>>({});
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(()=>{
    if (open) {
      setAnswers({});
      setSubmitted(false);
    }
  },[open]);

  if (!open) return null;

  const submit = () => {
    setSubmitted(true);
    const incorrect = stage.questions.some((q, idx)=> answers[idx] !== q.answer);
    if (incorrect) {
      onIncorrect('Review the key facts for this stage, then retry the quiz.', stage.image);
    } else {
      onCorrect();
    }
  };

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl mx-auto constitutional-card">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold mb-1">Stage Quiz</h3>
          <p className="text-sm text-muted-foreground mb-4">Answer all questions correctly to unlock the next growth.</p>

          <div className="space-y-4">
            {stage.questions.map((q, idx)=>(
              <div key={idx}>
                <p className="font-medium mb-2">{q.q}</p>
                <div className="grid gap-2">
                  {q.options.map(opt => (
                    <label key={opt} className={`border rounded p-2 cursor-pointer ${submitted && answers[idx]===opt ? 'border-[hsl(var(--primary))]' : 'border-border/20'}`}> 
                      <input 
                        type="radio" 
                        name={`q-${idx}`} 
                        className="mr-2"
                        value={opt}
                        onChange={()=> setAnswers(prev=> ({...prev, [idx]: opt}))}
                        aria-label={opt}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button className="btn-saffron" onClick={submit}>Submit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizModal;
