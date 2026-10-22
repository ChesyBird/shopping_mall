import mainPhoto from '../assets/hero.png'

const Main = () => {

    return(
        <div className="main">
            <h2>컴퓨터 기기 쇼핑몰</h2>
            <section>
                <h3>최신 컴퓨터 기기를 한 곳에서 만나보세요!</h3>
                <div>
                    <img src={mainPhoto} alt="메인 이미지" />
                </div>
            </section>
        </div>
    )
}

export default Main;