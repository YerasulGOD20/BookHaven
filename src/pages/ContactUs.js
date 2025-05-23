import React, { useState } from 'react';
import './contact.css';
import Nav from '../menu'; 

const faqs = [
  { question: 'How do I subscribe?', answer: 'Choose a suitable plan on the subscription page.' },
  { question: 'How can I cancel an order?', answer: 'Contact our support within 24 hours.' },
  { question: 'Can I return a book?', answer: 'Yes, within 7 days of purchase.' },
];

const Contact = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const handleBotClick = (e) => {
    e.preventDefault();
    alert('Bot link coming soon!');
  };

  return (
    <div className="contact-container">
      <Nav />

      <main className="contact-main">
        <section className="contact-section">
          <h2>Contact Us</h2>
          <p>
            Reach out via email at <a href="mailto:support@bookhaven.com">support@bookhaven.com</a> or use our website’s contact form.
          </p>
        </section>

        <section className="contact-section">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="https://www.facebook.com/BookHaven21?locale=ru_RU" target="_blank" rel="noreferrer"><img src="https://img.icons8.com/ios-filled/24/facebook--v1.png" alt="Facebook" /></a>
            <a href="https://www.instagram.com/bookhaven.kz/" target="_blank" rel="noreferrer"><img src="https://img.icons8.com/ios-filled/24/instagram-new.png" alt="Instagram" /></a>
            <a href="https://x.com/bookhavenfans" target="_blank" rel="noreferrer"><img src="https://img.icons8.com/ios-filled/24/telegram-app.png" alt="Telegram" /></a>
          </div>
        </section>

        <section className="contact-section">
          <h2>Our Bot</h2>
          <button className="bot-button" onClick={handleBotClick}>Telegram Bot 📚</button>
        </section>

        <section className="contact-section">
          <h2>FAQ</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openIndex === index ? 'open' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">{faq.question}</div>
                {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="contact-footer">
      <div style={{ textAlign: 'center', marginTop: '40px', padding: '20px', color: '#888' }}>
    © 2025 BookHaven. All rights reserved. | support@bookhaven.com
</div>
      </footer>
    </div>
  );
};

export default Contact;
