import React, { useState } from 'react';
import axios from 'axios';

function CreateQuizForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [questions, setQuestions] = useState([
        { text: '', answers: [{ text: '', isCorrect: false }] }
    ]);

    const handleQuestionChange = (index, field, value) => {
        const updated = [...questions];
        updated[index][field] = value;
        setQuestions(updated);
    };

    const handleAnswerChange = (qIndex, aIndex, field, value) => {
        const updated = [...questions];
        updated[qIndex].answers[aIndex][field] = value;
        setQuestions(updated);
    };

    const addQuestion = () => {
        setQuestions([...questions, { text: '', answers: [{ text: '', isCorrect: false }] }]);
    };

    const addAnswer = (qIndex) => {
        const updated = [...questions];
        updated[qIndex].answers.push({ text: '', isCorrect: false });
        setQuestions(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            title,
            description,
            isPublic,
            questions
        };
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/quiz', payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Quiz created with ID: ' + res.data.id);
        } catch (err) {
            console.error(err);
            alert('Failed to create quiz.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Stwórz nowy quiz</h2>
            <input
                type="text"
                placeholder="Tytuł"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Opis"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <label>
                <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                />
                Publiczny
            </label>

            {questions.map((q, qIndex) => (
                <div key={qIndex}>
                    <h4>Pytanie {qIndex + 1}</h4>
                    <input
                        type="text"
                        placeholder="Treść pytania"
                        value={q.text}
                        onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                        required
                    />
                    {q.answers.map((a, aIndex) => (
                        <div key={aIndex}>
                            <input
                                type="text"
                                placeholder="Odpowiedź"
                                value={a.text}
                                onChange={(e) => handleAnswerChange(qIndex, aIndex, 'text', e.target.value)}
                                required
                            />
                            <label>
                                <input
                                    type="checkbox"
                                    checked={a.isCorrect}
                                    onChange={(e) =>
                                        handleAnswerChange(qIndex, aIndex, 'isCorrect', e.target.checked)
                                    }
                                />
                                Poprawna
                            </label>
                        </div>
                    ))}
                    <button type="button" onClick={() => addAnswer(qIndex)}>
                        Dodaj odpowiedź
                    </button>
                </div>
            ))}

            <button type="button" onClick={addQuestion}>
                Dodaj pytanie
            </button>
            <br />
            <button type="submit">Zapisz quiz</button>
        </form>
    );
}

export default CreateQuizForm;