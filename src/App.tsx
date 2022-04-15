import styles from './App.module.css'
import poweredImage from './assets/powered.png'
import {useState}from 'react'
import {levels, calcImc, level} from './helpers/imc'
import {GridItem} from './components/gridItem'
import leftArrowImage from './assets/leftarrow.png'

export const App = () => {
  
  const [heightField, setHeightField] = useState<number>(0)
  const [weightField, setWeightField] = useState<number>(0)
  const [toShow, setToShow] = useState<level | null>(null)
  
  const handleCalculateButton = () => {
   if(heightField && weightField) {
     setToShow(calcImc(heightField, weightField))
   }else {
     alert('Preencha todos os campos')
   }
    // Simplificação do if/else
  }

  const handleBackButton = () => {
    setToShow(null)
    setHeightField(0)
    setWeightField(0)
  }

  return(
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width ={150} />
        </div>
        
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule seu IMC</h1>
         <p>IMC é a sigla para Índice de massa corpórea, parâmetro adotado pela Organização mundial de saúde para calcular o peso ideal de cada pessoa</p>

         <input type="number" value={heightField> 0 ? heightField : ''}  placeholder='Digite a sua altura. Ex:1' 
         onChange={e => setHeightField(parseFloat(e.target.value))}
         disabled = {toShow ? true : false}
         />
         <input type="number" value={weightField> 0 ? weightField : ''}  placeholder='Digite o seu peso. Ex:65.3' 
         onChange={e => setWeightField(parseFloat(e.target.value))}
         disabled = {toShow ? true : false}
         />
        <button onClick ={handleCalculateButton}  disabled = {toShow ? true : false}>Calcular</button>
        </div>
    <div className={styles.rightSide}>
      {!toShow &&
      <div className={styles.grid}>
        {levels.map((item, key) => (
          <GridItem key = {key} item = {item}/>
        ))}
      </div>
      }
      {toShow && 
        <div className={styles.rightBig}>
          <div className={styles.rightArrow} onClick = {handleBackButton}>
            <img src={leftArrowImage} alt="" width={25} />
          </div>
          <GridItem item = {toShow}/>
        </div>
      }
    </div>
      </div>
    </div>
  )
}

export default App
