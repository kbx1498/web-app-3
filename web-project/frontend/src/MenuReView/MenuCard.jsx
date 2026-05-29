import React from "react";

function MenuCard({ item, rank, selections, onSelect }) {
    const currentSelection = selections[item.id] || {};
    const isRecommended = currentSelection.recommend === true;

    // 💡 각 카테고리별로 앞에 붙일 한글 텍스트(label)를 함께 정의합니다.
    const options = [
        { category: "taste", label: "간", items: ["짬", "적당함", "싱거움"] },
        { category: "quantity", label: "양", items: ["많음", "적당함", "적음"] },
        { category: "priceOpt", label: "가격", items: ["비쌈", "적당함", "저렴함"] }
    ];

    const cardClass = rank ? "Menu-Card" : "All-Menu-Card";
    const imageBoxClass = rank ? "Menu-Image-Box" : "All-Menu-Image-Box";

    return (
        <div className={cardClass}>
            <div className={imageBoxClass}>
                <p>음식 사진</p>
            </div>

            {rank && (
                <div className="Rank">
                    <span className="Menu-Rank">{rank}</span>
                </div>
            )}

            <div className={rank ? "Menu-Name" : "All-Menu-Name"}>
                {item.name} ({item.store})
            </div>
            
            <div className={rank ? "Button-Option" : "All-Menu-Options"}>
                <div className="All-Button-Option-Wrapper">
                    {options.map((group, idx) => (
                        /* 💡 한 줄(Row) 내부에 타이틀 텍스트와 버튼 묶음을 나란히 배치합니다 */
                        <div key={idx} className="Option-Container">
                            <span className="Option-Label">{group.label}</span>
                            <div className="Button-Row">
                                {group.items.map((btnText) => {
                                    const isSelected = currentSelection[group.category] === btnText;
                                    return (
                                        <button
                                            key={btnText}
                                            className={isSelected ? "active-btn" : ""}
                                            onClick={() => onSelect(item.id, group.category, btnText)}
                                        >
                                            {btnText} {isSelected && "(1)"}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
                
                <div>
                    <button 
                        className={`Recommend-Box ${isRecommended ? "active-recommend" : ""}`}
                        onClick={() => onSelect(item.id, "recommend", true)}
                    >
                        추천 {isRecommended && "(1)"}
                    </button>
                </div>
            </div>

            <hr />
            <div className={rank ? "Price" : "All-Price"}>{item.price}</div>
        </div>
    );
}

export default MenuCard;