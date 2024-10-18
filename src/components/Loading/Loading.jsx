import './Loading.css'

export default function () {
    return (
        <div className="wtf">
            <div className="loader">
                <span style={{ '--i': 1 }}>L</span>
                <span style={{ '--i': 2 }}>o</span>
                <span style={{ '--i': 3 }}>a</span>
                <span style={{ '--i': 4 }}>d</span>
                <span style={{ '--i': 5 }}>i</span>
                <span style={{ '--i': 6 }}>n</span>
                <span style={{ '--i': 7 }}>g</span>
                <span style={{ '--i': 8 }}>.</span>
                <span style={{ '--i': 9 }}>.</span>
                <span style={{ '--i': 10 }}>.</span>
            </div>
            <p>Если один из источников не отвечает, то загрузка может длится чуть больше чем обычно, т.к. много ресурсов входит в запрос, вскоре будет возможность самому выбирать, где искать!</p>
        </div>)
}

