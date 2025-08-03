const player1 ={
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER:3,
    PONTOS: 0,
};
const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

async function rollDice() {
    return Math.floor(Math.random() *6) + 1;
};

async function getRandomBlock() {
    let random = Math.random();
    let result

    switch (true) {
        case random < 0.33:
            result = "Reta"
            break;
        case random < 0.66:
            result = "Curva"
            break;
        default:
            result = "confronto";
    }

    return result;
}

async function playRaceEngine(charactere1, charactere2) {
   for(let round = 1; round <= 5; round++) {
    console.log(`Rodada ${round}`);

    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco sorteado: ${block}`);


   }
    // Jogar dados

    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade

    let totalTesteSkill1 = 0;
    let totalTesteSkill2 = 0;
    if (block === "Reta") {
        totalTesteSkill1 = charactere1.VELOCIDADE + diceResult1;
        totalTesteSkill2 = charactere2.VELOCIDADE + diceResult2;

        
    } else if (block === "Curva") {
        totalTesteSkill1 = charactere1.MANOBRABILIDADE + diceResult1;
        totalTesteSkill2 = charactere2.MANOBRABILIDADE + diceResult2;
    } else if (block === "confronto") {
        totalTesteSkill1 = charactere1.PODER + diceResult1;
        totalTesteSkill2 = charactere2.PODER + diceResult2;
    }
};   

(async function main() {
    console.log(`Iniciando o jogo...🚗🚗. Corrida entre ${player1.NOME} e ${player2.NOME}\n`);
    await playRaceEngine(player1, player2);
})();

