import { useState } from 'react';
import './FAQ.css';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What age groups do you teach?",
            answer: "We offer chess coaching for all age groups, from beginners (5+ years) to advanced players. Our personalized approach ensures that each student receives training suited to their skill level and learning pace."
        },
        {
            question: "How are the classes conducted?",
            answer: "Classes are conducted online via Zoom/Google Meet with interactive chess boards. Each session includes live instruction, practice games, puzzle solving, and personalized feedback. We also provide recorded sessions for review."
        },
        {
            question: "What is the duration of each class?",
            answer: "Standard classes are 60 minutes long. For advanced students, we offer 90-minute intensive sessions. We also have flexible scheduling options including weekend batches."
        },
        {
            question: "Do you offer one-on-one coaching?",
            answer: "Yes! We offer both group classes (4-6 students) and personalized one-on-one coaching. Private sessions allow for focused attention on specific weaknesses and faster improvement."
        },
        {
            question: "What qualifications do your coaches have?",
            answer: "All our coaches are FIDE-rated players with titles ranging from Candidate Master to Grandmaster. They have extensive teaching experience and follow structured curriculum based on international standards."
        },
        {
            question: "How do I track my child's progress?",
            answer: "Parents receive monthly progress reports including rating improvements, tournament performance, tactical skills assessment, and areas for improvement. We also provide access to our student portal for real-time tracking."
        },
        {
            question: "What equipment do I need?",
            answer: "You'll need a computer/tablet with stable internet, webcam, and microphone. We recommend having a physical chess board for practice. All learning materials and digital resources are provided by us."
        },
        {
            question: "Can I get a free trial class?",
            answer: "Absolutely! We offer a free demo class where you can experience our teaching methodology, meet the coach, and assess if our program is right for you. Book your free demo using the form above."
        },
        {
            question: "What is your refund policy?",
            answer: "We offer a 100% money-back guarantee if you're not satisfied after the first paid class. For ongoing courses, refunds are prorated based on classes attended, minus a small administrative fee."
        },
        {
            question: "Do you prepare students for tournaments?",
            answer: "Yes! We provide specialized tournament preparation including opening preparation, time management, psychological training, and game analysis. We also help students register for online and offline tournaments."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="section faq-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="fade-in">Frequently Asked Questions</h2>
                    <p className="section-subtitle fade-in">
                        Everything you need to know about ChessHub Academy
                    </p>
                </div>

                <div className="faq-container">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`glass-card faq-item ${openIndex === index ? 'active' : ''}`}
                        >
                            <button
                                className="faq-question"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span>{faq.question}</span>
                                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
                            </button>
                            <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="faq-cta">
                    <p>Still have questions?</p>
                    <a href="mailto:clubchess259@gmail.com" className="btn btn-primary">
                        Contact Us
                    </a>
                </div>
            </div>
        </section>
    );
}
