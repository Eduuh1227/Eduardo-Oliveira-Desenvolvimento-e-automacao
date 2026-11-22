type Study = { sections: [string, string][]; run: string };
export const studies: Record<string, Study> = {
  'deteccao-de-plasticos': {
    sections: [
      ['Dados e método', 'O projeto acadêmico usa imagens anotadas do conjunto TACO e fotografias de garrafas em rios. A interface valida a imagem, prepara os pixels e mostra como os filtros afetam a escala de cinza e a máscara. A segmentação usa intensidades. Para localizar objetos, o YOLO usa pesos treinados e retorna caixas com uma pontuação de confiança.'],
      ['Decisão técnica', 'O processamento, o detector e a interface ficam em módulos separados. Isso permite testar os filtros sem carregar pesos e comparar detectores sobre a mesma fotografia.'],
      ['Limitações e próximo passo', 'Reflexos podem gerar marcações incorretas e objetos pequenos podem passar despercebidos. A caixa indica uma hipótese visual sobre o material. Uma próxima avaliação precisaria de fotos independentes das usadas para ajustar o modelo.']
    ],
    run: 'Python 3.12 · na pasta que contém app.py:\npython -m pip install -r requirements.txt\npython -m streamlit run app.py'
  },
  'ilima-advogados': {
    sections: [
      ['Implementação', 'Organizei a navegação por áreas de atuação, o menu móvel e o acesso ao WhatsApp. O visitante pode sair da apresentação do escritório diretamente para a conversa.'],
      ['Decisão técnica', 'HTML, CSS e JavaScript bastam para as seções institucionais e a troca de imagens da galeria. A página pode ser publicada como arquivos estáticos.'],
      ['Limitações e próximo passo', 'O atendimento acontece no WhatsApp. Um próximo passo é avaliar se visitantes de celular localizam a área de atuação desejada antes de iniciar contato.']
    ], run: 'Abra index.html no navegador a partir da pasta do projeto.'
  },
  'controle-de-tarefas': {
    sections: [
      ['Implementação', 'Implementei o fluxo de cadastro, login e edição de tarefas vinculadas ao usuário. A interface envia as alterações para a API em Node.js.'],
      ['Decisão técnica', 'A persistência em JSON permite executar e inspecionar o projeto de estudo sem configurar um banco separado.'],
      ['Limitações e próximo passo', 'Um arquivo local dificulta escritas simultâneas e a execução em várias instâncias. Para esse cenário, o próximo passo seria usar um banco com transações.']
    ], run: 'npm start\nAbra http://localhost:3000.'
  },
  'bot-whatsapp-web': {
    sections: [
      ['Implementação', 'Organizei o atendimento em opções de menu. O bot interpreta a resposta, consulta serviços externos e devolve o resultado na conversa.'],
      ['Decisão técnica', 'A sessão do WhatsApp Web permite testar o fluxo com o cliente conectado. A consulta de CEP usa uma API externa para obter o endereço.'],
      ['Limitações e próximo passo', 'O atendimento depende da sessão e da disponibilidade das APIs. O próximo passo é testar a recuperação quando uma consulta demora ou a sessão expira.']
    ], run: 'Em uma instalação limpa, com sua própria sessão:\nnpm install\nnode index.js\nAutentique seu WhatsApp pelo QR code.'
  }
};
