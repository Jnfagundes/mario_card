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
};

async function logRollResult(characterName,block, diceResult,attribute){
    console.log(`${characterName} rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute} `);
};

async function playRaceEngine(charactere1, charactere2) {
   for(let round = 1; round <= 5; round++) {
    console.log(`Rodada ${round}`);

    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco sorteado: ${block}`);

        // Jogar dados

    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();
    

    //teste de habilidade

    let totalTesteSkill1 = 0;
    let totalTesteSkill2 = 0;

    if (block === "Reta") {
        totalTesteSkill1 = charactere1.VELOCIDADE + diceResult1;
        totalTesteSkill2 = charactere2.VELOCIDADE + diceResult2;

        await logRollResult(
            charactere1.NOME,
            "velocidade",
            diceResult1,
            charactere1.VELOCIDADE
        );

        await logRollResult(
            charactere2.NOME,
            "velocidade",
            diceResult2,
            charactere2.VELOCIDADE
        );

    } else if (block === "Curva") {
        totalTesteSkill1 = charactere1.MANOBRABILIDADE + diceResult1;
        totalTesteSkill2 = charactere2.MANOBRABILIDADE + diceResult2;

        await logRollResult(
            charactere1.NOME,
            "manobrabilidade",
            diceResult1,
            charactere1.MANOBRABILIDADE
        );

        await logRollResult(
            charactere2.NOME,
            "manobrabilidade",
            diceResult2,
            charactere2.MANOBRABILIDADE
        );

    } else if (block === "confronto") {
         let powerResult1 = charactere1.PODER + diceResult1;
        let powerResult2 = charactere2.PODER + diceResult2;

        console.log(`${charactere1.NOME} confrontou com ${charactere2.NOME}!`);
        await logRollResult(
            charactere1.NOME,
            "poder",
            diceResult1,
            charactere1.PODER
        );

        await logRollResult(
            charactere2.NOME,
            "poder",
            diceResult2,
            charactere2.PODER
        );

        if (powerResult1 > powerResult2) {
            if(charactere2.PONTOS > 0) {
                charactere2.PONTOS --;
            }
        }

         if (powerResult2 > powerResult1) {
            if(charactere1.PONTOS > 0) {
                charactere1.PONTOS --;
            }
        }

        if (powerResult1 === powerResult2) {
            console.log("Empate! Nenhum ponto foi perdido.");
        }

    //verificando o vencedor
    if (totalTesteSkill1 > totalTesteSkill2) {
        console.log(`${charactere1.NOME} marcou um ponto!`);
        charactere1.PONTOS ++;
    } else if (totalTesteSkill2 > totalTesteSkill1) {
        console.log(`${charactere2.NOME} marcou um ponto!`);
        charactere2.PONTOS ++;
    }

    console.log('-----------------------------------');
   }

}
};   

(async function main() {
    console.log(`Iniciando o jogo...🚗🚗. Corrida entre ${player1.NOME} e ${player2.NOME}\n`);
    await playRaceEngine(player1, player2);
})();
