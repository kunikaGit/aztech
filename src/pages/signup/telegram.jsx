import { useEffect } from 'react';

const TelegramLogin = ({redirectUrl}) => {
  useEffect(() => {
    window.onTelegramAuth = function (user) {
      alert(`Logged in as ${user.first_name} (${user.id})`);
      console.log("Telegram User:", user);
    };

    const existing = document.getElementById("telegram-login-script");
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.id = "telegram-login-script";
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-login", "AZTechV1Bot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "false");
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-auth-url", redirectUrl);

    const container = document.getElementById("telegram-login");
    if (container) container.appendChild(script);

    return () => {
      window.onTelegramAuth = null;
      const cleanup = document.getElementById("telegram-login-script");
      if (cleanup) cleanup.remove();
    };
  }, []);

  return <div id="telegram-login" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}></div>;
};

export default TelegramLogin;
