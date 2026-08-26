export default function NutritionTable({ nutrition, itemName }) {
  const rows = [
    ["Serving Size", nutrition.servingSize],
    ["Calories", `${nutrition.calories} kcal`],
    ["Total Fat", `${nutrition.totalFat} g`],
    ["Saturated Fat", `${nutrition.saturatedFat} g`],
    ["Trans Fat", `${nutrition.transFat} g`],
    ["Cholesterol", `${nutrition.cholesterol} mg`],
    ["Sodium", `${nutrition.sodium} mg`],
    ["Total Carbohydrate", `${nutrition.totalCarbohydrate} g`],
    ["Dietary Fiber", `${nutrition.dietaryFiber} g`],
    ["Total Sugars", `${nutrition.totalSugars} g`],
    ["Protein", `${nutrition.protein} g`],
  ];

  return (
    <table className="nutrition-table">
      <caption className="visually-hidden">Nutrition facts for {itemName}</caption>
      <thead>
        <tr>
          <th scope="col">Nutrient</th>
          <th scope="col">Amount per serving</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label}>
            <th scope="row">{label}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
