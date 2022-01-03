import styles from '../../../styles/modules/home.module.css';

const Hero = () => {
  return (
      <header className={`top-margin ${styles.hero} `}>
          <div className={`container ${styles.hero__container}`}>
            <div className={styles.hero__text}>
              <p>
                Escribe, comparte, lee y disfruta de relatos, frases o cuentos cortos escritos por nuestra comunidad y aporta tus escritos o lo que sientes.
              </p>
              <p>
                Si eres apasionado de la lectura o escritura y te gustaría que alguien leyera lo que haces, este puede ser un lugar para ti!
              </p>
            </div>
          </div>
      </header>
  )
}

export default Hero;