import { Question } from '../../types/deckTypes'
import QuestionItem from './question-item/QuestionItem'

interface Props {
  questions: Question[]
}
export default function QuestionsList({ questions }: Props) {
  return (
    <div className="">
      {questions.map((question) => (
        <QuestionItem key={question.questionID} question={question} />
      ))}
    </div>
  )
}
