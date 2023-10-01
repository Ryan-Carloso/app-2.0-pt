import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

function Notify() {
  const bodyText = [
    'No jogo da penalidade!',
    'Um dia perfeito para ganhar!',
    'Eu quero ganhar!',
    'O jogo que paga para jogar!',
    'Obtenha um bônus no seu primeiro depósito!',
    'Registre-se e comece a jogar!',
    'Ganhe dinheiro com penalidades no telemóvel!',
  ];
  const NameText = ["luan", "Ryan", "Matheus", "Fernando", "joão", "Gabriel", "João", "luis", "Enzo", "Pedro", "Tiago", "André", "Paulo"];

  useEffect(() => {
    async function registerForPushNotificationsAsync() {
      try {
        const { status } = await Notifications.requestPermissionsAsync();

        if (status !== 'granted') {
          console.log('Permissão para notificações não concedida!');
          return;
        }

        // Defina o manipulador de notificações para lidar com as notificações quando forem recebidas
        Notifications.setNotificationHandler({
          handleNotification: async (notification) => {
            // Essa função será chamada quando uma notificação for recebida
            console.log('Notificação recebida - Título:', notification.request.content.title);
            console.log('Notificação recebida - Corpo:', notification.request.content.body);
            // Adicione mais propriedades específicas, se necessário
            return {
              shouldShowAlert: true,
              shouldPlaySound: true,
              shouldSetBadge: false,
            };
          },
        });

        // Função para adicionar minutos a um horário específico
        function adicionarMinutosAoTempo(tempo, minutos) {
          return new Date(tempo.getTime() + minutos * 60000); // 60000 milissegundos em um minuto
        }

        // Quando o aplicativo é aberto (você pode colocar esse código onde a inicialização do seu aplicativo ocorre)
        const agora = new Date(); // Hora atual
        const horaAlvo = adicionarMinutosAoTempo(agora, 1); // Adicionar 5 minutos à hora atual

        const tempoAtéNotificação = horaAlvo.getTime() - agora.getTime();

        setTimeout(() => {
          enviarNotificacao("Ei, não se esqueça!", "Os ganhos estão esperando por você! Clique aqui e inscreva-se agora para obter até 125% de bônus no primeiro depósito!");
        }, tempoAtéNotificação);

        // Agende um loop de notificações com o intervalo especificado
        //const intervaloNotificacoes = 5 * 60 * 60 * 1000; // 5 horas em milissegundos
        const intervaloNotificacoes = 7 * 60 * 1000; // 9 minutos em milissegundos

        function agendarLoopDeNotificacoes() {
          setTimeout(() => {
            enviarNotificacao('No jogo da penalidade!', getRandomMessage1());
            setTimeout(() => {
              enviarNotificacao(getRandomTitle(), getRandomMessage2());
              setTimeout(() => {
                enviarNotificacao(getRandomTitle(), getRandomMessage3());
                setTimeout(() => {
                  enviarNotificacao(getRandomTitle(), getRandomMessage4());
                  // Chame a função novamente para manter o loop
                  agendarLoopDeNotificacoes();
                }, intervaloNotificacoes);
              }, intervaloNotificacoes);
            }, intervaloNotificacoes);
          }, intervaloNotificacoes);
        }

        // Inicie o loop de notificações
        agendarLoopDeNotificacoes();
      } catch (error) {
        console.log('Erro ao solicitar permissões de notificação:', error);
      }
    }

    registerForPushNotificationsAsync();
  }, []);

  async function enviarNotificacao(titulo, corpo) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: titulo,
        body: corpo,
        sound: true,
      },
      trigger: null, // O gatilho é definido como nulo para enviar a notificação imediatamente
    });

    console.log('Notificação enviada!');
  }

  function getRandomTitle() {
    const randomString = bodyText[Math.floor(Math.random() * bodyText.length)];
    return randomString;
  }

  function getRandomMessage1() {
    const numeroAleatorio = gerarNumeroAleatorio();
    const nome = NameText[Math.floor(Math.random() * NameText.length)];
    return nome + " ganhou R$ " + numeroAleatorio + " agora mesmo ao jogar este jogo! Faça um depósito e obtenha um bônus de 125%!";
  }

  function getRandomMessage2() {
    const numeroAleatorio1 = gerarNumeroAleatorio1();
    const eurosAleatorios2x = gerarEuros2x();
    return "Um total de " + numeroAleatorio1 + " jogadores acabaram de ganhar R$ " + eurosAleatorios2x + " jogando este jogo! Clique aqui e comece agora!";
  }

  function getRandomMessage3() {
    const numeroAleatorio = gerarNumeroAleatorio();
    return "Clique aqui para se inscrever no jogo hoje e receber um bônus de 100% no seu depósito! Hoje, um total de " + numeroAleatorio + " pessoas estão ganhando com este jogo!";
  }

  function getRandomMessage4() {
    const nome = NameText[Math.floor(Math.random() * NameText.length)];
    const numeroAleatorio = gerarNumeroAleatorio();
    return "Registre-se hoje, clique aqui para começar a ganhar jogando com este aplicativo! Obtenha um bônus no seu primeiro depósito!, assim como " + nome + " ganhou R$ " + numeroAleatorio + " hoje!";
  }

  function gerarNumeroAleatorio() {
    const min = 700;
    const max = 9000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function gerarNumeroAleatorio1() {
    const min = 40;
    const max = 150;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function gerarEuros2x() {
    const min = 4000;
    const max = 30000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return null; // Você pode retornar qualquer JSX aqui ou apenas `null` se não quiser renderizar nada
}

export default Notify;
