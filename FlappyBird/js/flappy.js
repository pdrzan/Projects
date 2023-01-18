function numeroAleatorioEntre(min, max) {
    if(min > max) [min, max] = [max, min]
    let fator = max - min + 1
    return Math.floor(fator * Math.random() + min)
}

function pular(elemento, elementoRelativo) {
    const topRelativo = elementoRelativo.getBoundingClientRect().top
    const top = elemento.getBoundingClientRect().top
    const wmFlappy = document.querySelector('[wm-flappy]')
    if(wmFlappy.hasAttribute('parada')) {
        return 0
    } else if(topRelativo < top && top - 50 > topRelativo) {
        elemento.style.top = `${top - topRelativo - 40}px`
    } else {
        elemento.style.top = `0px`
    }
}

function cairPraSempre(elemento, elementoRelativo) {
    const bottomRelativo = elementoRelativo.getBoundingClientRect().bottom
    const topRelativo = elementoRelativo.getBoundingClientRect().top
    const wmFlappy = document.querySelector('[wm-flappy]')
    const interval = setInterval(() => {
        const top = elemento.getBoundingClientRect().top
        const bottom = elemento.getBoundingClientRect().bottom
        if(wmFlappy.hasAttribute('parada')) {
            clearInterval(interval)
            return 0
        } else if(bottom < bottomRelativo) {
            elemento.style.top = `${top - topRelativo + 1}px`
        }
    }, 8)
}

function gerarColunas() {
    const wmFlappy = document.querySelector('[wm-flappy]')
    if(!wmFlappy.hasAttribute('parada')) {
        const coluna = document.createElement('div')
        const basePonta1 = document.createElement('div')
        const basePonta2 = document.createElement('div')
        const base1 = document.createElement('div')
        const base2 = document.createElement('div')
        const ponta1 = document.createElement('div')
        const ponta2 = document.createElement('div')
        const contagem = document.querySelector('[contagem]')
        const numeroAleatorio = numeroAleatorioEntre(0, 260)
        coluna.setAttribute('coluna', '')
        basePonta1.setAttribute('basePonta', '')
        basePonta2.setAttribute('basePonta', '')
        base1.setAttribute('base', '')
        base2.setAttribute('base', '')
        base2.setAttribute('inverte', '')
        ponta1.setAttribute('ponta', '')
        ponta2.setAttribute('ponta', '')
        wmFlappy.appendChild(coluna)
        wmFlappy.removeChild(contagem)
        coluna.appendChild(basePonta1)
        coluna.appendChild(basePonta2)
        basePonta1.appendChild(base1)
        basePonta1.appendChild(ponta1)
        basePonta2.appendChild(ponta2)
        basePonta2.appendChild(base2)
        wmFlappy.appendChild(contagem)
        
        base1.style.height = `${30 + numeroAleatorio}px`
        base2.style.height = `${30 + (260 - numeroAleatorio)}px`
        if(!wmFlappy.hasAttribute('parada')){
            moverElemento(coluna, 800, -120, wmFlappy)
            setTimeout(gerarColunas, 2500)
        } else {
            return 0
        }
    } else {
        return 0
    }
}

function moverElemento(elemento, leftInicial, leftFinal, elementoPai) {
    if(leftInicial > leftFinal) {
        let contador = leftInicial
        const interval = setInterval(() => {
            const wmFlappy = document.querySelector('[wm-flappy]')
            elemento.style.left = `${contador - 1}px`
            contador--
            if(wmFlappy.hasAttribute('parada')) {
                clearInterval(interval)
                return 0
            } else if(contador <= leftFinal) {
                clearInterval(interval)
                elementoPai.removeChild(elemento)
            } 
        }, 7)
    } else {
        let contador = leftInicial
        const interval = setInterval(() => {
            const wmFlappy = document.querySelector('[wm-flappy]')
            elemento.style.left = `${contador + 1}px`
            contador++
            if(wmFlappy.hasAttribute('parada')) {
                clearInterval(interval)
                return 0
            } else if(contador >= leftFinal) {
                clearInterval(interval)
                elementoPai.removeChild(elemento)
            }
        }, 7)
    }
}

function contagem() {
    const contagem = document.querySelector('[contagem]')
    const wmFlappy = document.querySelector('[wm-flappy]')
    let contador = 1
    const interval = setInterval(() => {
        if(wmFlappy.hasAttribute('parada')) {
            clearInterval(interval)
            return 0
        } else {
            contagem.innerHTML = `${contador}`
            contador++
        }
    }, 2500)
}

function colisao() {
    const flappy = document.getElementById('flappy-bird')
    const wmFlappy = document.querySelector('[wm-flappy]')
    const interval = setInterval(() => {
        const colunas = document.querySelectorAll('[coluna]')
        for(x of colunas) {
            documentHtml = document.querySelector('html')
            documentWidth = (documentHtml.getBoundingClientRect().width - 800) / 2
            leftColuna = x.getBoundingClientRect().left - documentWidth
            if(252.215 < leftColuna && leftColuna < 427.795) {
                const elemelemntosBase = x.querySelectorAll('[base]')
                const elemelemntosPonta = x.querySelectorAll('[ponta]')
                const altura1 = elemelemntosBase[0].getBoundingClientRect().height
                const altura2 = elemelemntosBase[1].getBoundingClientRect().height
                const altura3 = elemelemntosPonta[0].getBoundingClientRect().height
                const altura4 = elemelemntosPonta[1].getBoundingClientRect().height
                const topFlappy = flappy.getBoundingClientRect().top - 100
                const heighFlappy = flappy.getBoundingClientRect().height
                if(altura1 + altura3 > topFlappy || (500 - (altura2 + altura4 + heighFlappy)) < topFlappy) {
                    wmFlappy.setAttribute('parada', '')
                    document.onkeydown = () => {
                        iniciar()
                    }
                    clearInterval(interval)
                    return 0
                }
            }
        }
    }, 10)
}


function iniciar() {
    const wmFlappy = document.querySelector('[wm-flappy]')
    const contagem1 = document.querySelector('[contagem]')
    const colunas = wmFlappy.querySelectorAll('[coluna]')
    for(x of colunas) {
        wmFlappy.removeChild(x)
    }
    wmFlappy.removeAttribute('parada')
    gerarColunas()
    contagem1.innerHTML = '0'
    setTimeout(contagem, 1100)
    const div = document.querySelector('div')
    const flappy = document.getElementById('flappy-bird')
    document.onkeydown = () => pular(flappy, div)
    cairPraSempre(flappy, div)
    colisao()
}
iniciar()