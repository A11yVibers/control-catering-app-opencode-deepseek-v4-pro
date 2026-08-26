export default function NutritionTable({ nutrition }) {
  const rows = [
    ['Calories', `${nutrition.calories}`],
    ['Total Fat', `${nutrition.fat}g`],
    ['  Saturated Fat', `${nutrition.satFat}g`],
    ['Cholesterol', `${nutrition.cholesterol}mg`],
    ['Sodium', `${nutrition.sodium}mg`],
    ['Total Carbohydrate', `${nutrition.carbs}g`],
    ['  Dietary Fiber', `${nutrition.fiber}g`],
    ['  Total Sugars', `${nutrition.sugar}g`],
    ['Protein', `${nutrition.protein}g`],
  ]

  return (
    <div className="nutrition">
      <h4 className="nutrition-title">Nutrition Facts</h4>
      <p className="nutrition-serving">Serving Size: {nutrition.servingSize}</p>
      <table className="nutrition-table">
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label}>
              <td className={label.startsWith('  ') ? 'indented' : ''}>
                {label.trim()}
              </td>
              <td className="right">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="muted nutrition-note">
        Values are approximate per portion.
      </p>
    </div>
  )
}
