import React, { useState } from 'react';
import { Language } from '../types';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactFormProps {
  lang: Language;
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const getApiBase = () => {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'eckertpreisser.de' || host === 'www.eckertpreisser.de')
      return '/api/email';
    if (host === 'becker.limited')
      return '/development/api/email';
  }
  return '/api/email';
};

const CONTACT_TRANSLATIONS: Record<string, {
  subtitle: string; title: string; description: string;
  name: string; namePlaceholder: string; email: string; emailPlaceholder: string;
  subject: string; subjectPlaceholder: string; message: string; messagePlaceholder: string;
  send: string; sending: string; success: string; error: string;
}> = {
  en: {
    subtitle: 'Get in Touch', title: 'Send Us a Message',
    description: 'Interested in ZANKTUM VILLAS? We\'d love to hear from you.',
    name: 'Name', namePlaceholder: 'Your name',
    email: 'E-Mail', emailPlaceholder: 'your.email@example.com',
    subject: 'Subject', subjectPlaceholder: 'What is this about?',
    message: 'Message', messagePlaceholder: 'Your message to us...',
    send: 'Send Message', sending: 'Sending...',
    success: 'Message sent successfully! We\'ll get back to you soon.',
    error: 'Failed to send message. Please try again later.',
  },
  de: {
    subtitle: 'Kontakt aufnehmen', title: 'Schreiben Sie uns',
    description: 'Interesse an unseren Zwillingsvillen? Wir freuen uns auf Ihre Nachricht.',
    name: 'Name', namePlaceholder: 'Ihr Name',
    email: 'E-Mail', emailPlaceholder: 'ihre.email@beispiel.de',
    subject: 'Betreff', subjectPlaceholder: 'Worum geht es?',
    message: 'Nachricht', messagePlaceholder: 'Ihre Nachricht an uns...',
    send: 'Nachricht senden', sending: 'Wird gesendet...',
    success: 'Nachricht erfolgreich gesendet! Wir melden uns bald bei Ihnen.',
    error: 'Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.',
  },
  ar: {
    subtitle: 'تواصل معنا', title: 'أرسل لنا رسالة',
    description: 'هل أنت مهتم بفيلتينا التوأم؟ يسعدنا سماعك.',
    name: 'الاسم', namePlaceholder: 'اسمك الكامل',
    email: 'البريد الإلكتروني', emailPlaceholder: 'بريدك@مثال.com',
    subject: 'الموضوع', subjectPlaceholder: 'عم تريد التحدث؟',
    message: 'الرسالة', messagePlaceholder: 'رسالتك إلينا...',
    send: 'إرسال الرسالة', sending: 'جارٍ الإرسال...',
    success: 'تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.',
    error: 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى لاحقاً.',
  },
  ru: {
    subtitle: 'Свяжитесь с нами', title: 'Отправьте нам сообщение',
    description: 'Интересуетесь нашими виллами-двойниками? Мы будем рады услышать вас.',
    name: 'Имя', namePlaceholder: 'Ваше имя',
    email: 'E-Mail', emailPlaceholder: 'ваш.email@пример.com',
    subject: 'Тема', subjectPlaceholder: 'О чём хотите написать?',
    message: 'Сообщение', messagePlaceholder: 'Ваше сообщение для нас...',
    send: 'Отправить сообщение', sending: 'Отправка...',
    success: 'Сообщение успешно отправлено! Мы скоро с вами свяжемся.',
    error: 'Не удалось отправить сообщение. Пожалуйста, попробуйте позже.',
  },
  uk: {
    subtitle: 'Зв\'яжіться з нами', title: 'Надішліть нам повідомлення',
    description: 'Зацікавлені нашими виллами-близнюками? Ми раді почути вас.',
    name: 'Ім\'я', namePlaceholder: 'Ваше ім\'я',
    email: 'E-Mail', emailPlaceholder: 'ваш.email@приклад.com',
    subject: 'Тема', subjectPlaceholder: 'Про що хочете написати?',
    message: 'Повідомлення', messagePlaceholder: 'Ваше повідомлення для нас...',
    send: 'Надіслати повідомлення', sending: 'Надсилання...',
    success: 'Повідомлення успішно надіслано! Ми зв\'яжемося з вами незабаром.',
    error: 'Не вдалося надіслати повідомлення. Будь ласка, спробуйте пізніше.',
  },
  zh: {
    subtitle: '联系我们', title: '发送消息',
    description: '对我们的双子别墅感兴趣？我们很乐意听取您的意见。',
    name: '姓名', namePlaceholder: '您的姓名',
    email: '电子邮件', emailPlaceholder: 'your.email@example.com',
    subject: '主题', subjectPlaceholder: '关于什么？',
    message: '消息', messagePlaceholder: '您的消息...',
    send: '发送消息', sending: '发送中...',
    success: '消息发送成功！我们将尽快回复您。',
    error: '消息发送失败，请稍后再试。',
  },
  es: {
    subtitle: 'Ponerse en Contacto', title: 'Envíenos un Mensaje',
    description: '¿Interesado en nuestras Villas Gemelas? Nos encantaría saber de usted.',
    name: 'Nombre', namePlaceholder: 'Su nombre',
    email: 'Correo Electrónico', emailPlaceholder: 'su.email@ejemplo.com',
    subject: 'Asunto', subjectPlaceholder: '¿De qué se trata?',
    message: 'Mensaje', messagePlaceholder: 'Su mensaje para nosotros...',
    send: 'Enviar Mensaje', sending: 'Enviando...',
    success: '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.',
    error: 'Error al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.',
  },
  fr: {
    subtitle: 'Prendre Contact', title: 'Envoyez-nous un Message',
    description: 'Intéressé par nos Villas Jumelles ? Nous serions ravis de vous entendre.',
    name: 'Nom', namePlaceholder: 'Votre nom',
    email: 'E-Mail', emailPlaceholder: 'votre.email@exemple.com',
    subject: 'Sujet', subjectPlaceholder: 'De quoi s\'agit-il?',
    message: 'Message', messagePlaceholder: 'Votre message pour nous...',
    send: 'Envoyer le Message', sending: 'Envoi en cours...',
    success: 'Message envoyé avec succès! Nous vous répondrons bientôt.',
    error: 'Échec de l\'envoi du message. Veuillez réessayer plus tard.',
  },
  tr: {
    subtitle: 'İletişime Geçin', title: 'Bize Mesaj Gönderin',
    description: 'İkiz villalarımızla mı ilgileniyorsunuz? Sizden haber almaktan memnuniyet duyarız.',
    name: 'Ad', namePlaceholder: 'Adınız',
    email: 'E-posta', emailPlaceholder: 'ornek@eposta.com',
    subject: 'Konu', subjectPlaceholder: 'Konu nedir?',
    message: 'Mesaj', messagePlaceholder: 'Bize iletmek istedikleriniz...',
    send: 'Mesaj Gönder', sending: 'Gönderiliyor...',
    success: 'Mesaj başarıyla gönderildi! En kısa sürede size geri döneceğiz.',
    error: 'Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.',
  },
};

const ContactForm: React.FC<ContactFormProps> = ({ lang }) => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch(`${getApiBase()}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'kontakt@eckertpreisser.de',
          subject: `Alanya Villas - Contact: ${form.subject}`,
          body: `From: ${form.name} (${form.email})\n\nMessage:\n${form.message}`,
          html: false,
        }),
      });

      if (!res.ok) throw new Error('Send failed');
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const t = CONTACT_TRANSLATIONS[lang] ?? CONTACT_TRANSLATIONS.en;

  const inputClass = 'w-full px-5 py-4 bg-cream-50 text-navy-900 border-2 border-navy-900/10 rounded-lg placeholder-navy-900/30 focus:outline-none focus:border-gold-400/50 focus:ring-4 focus:ring-gold-400/20 transition-all duration-300 text-base';
  const labelClass = 'block text-sm font-medium text-cream-100/80 mb-2 uppercase tracking-wider';

  return (
    <section id="contact" className="py-24 px-4 bg-cream-100">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <span className="font-display text-xs tracking-[0.3em] text-gold-400 uppercase block mb-4">
            {t.subtitle}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-navy-900 mb-4">{t.title}</h2>
          <p className="text-navy-900/60 max-w-lg mx-auto">{t.description}</p>
        </div>

        <div className="bg-navy-900 rounded-xl p-6 sm:p-8 md:p-12 shadow-2xl">
          {status === 'success' && (
            <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 mb-6 flex items-center gap-3">
              <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
              <p className="text-white font-semibold text-sm">{t.success}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 mb-6 flex items-center gap-3">
              <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
              <p className="text-white font-semibold text-sm">{t.error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className={labelClass}>{t.name} *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t.namePlaceholder}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>{t.email} *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t.emailPlaceholder}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className={labelClass}>{t.subject} *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={form.subject}
                onChange={handleChange}
                placeholder={t.subjectPlaceholder}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>{t.message} *</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                value={form.message}
                onChange={handleChange}
                placeholder={t.messagePlaceholder}
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full px-8 py-5 bg-gold-400 text-navy-900 font-bold rounded-lg hover:bg-gold-500 hover:scale-[1.01] transition-all duration-300 uppercase text-sm tracking-widest disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
            >
              <Send size={18} />
              {status === 'sending' ? t.sending : t.send}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
