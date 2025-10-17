# Product 3: US Travel Days Field - Future Enhancement Documentation

## Overview
The `usTravelDays` field stores the number of days a traveler will spend in the United States during their trip for **Product 3: RIMI Canuck Voyage Travel Medical**.

## Current Implementation

### Database Location
- **Quote Model**: `usTravelDays Int?`
- **Policy Model**: `usTravelDays Int?`

### Frontend Collection
- **Component**: `CoverageInformation.tsx`
- **Conditional Display**: Only shown when user selects "Yes" for "Are you travelling through the US?"
- **Input Type**: Number input field

### Backend Storage
- **Stage 1 (Next/Save)**: Stored in Quote table
- **Policy Creation**: Copied from Quote to Policy on payment success

## Current Usage
**Status**: **INFORMATIONAL ONLY** ✅

The field is currently collected and stored but **does NOT affect premium calculation**.

### Premium Calculation Logic
Premium zones are determined by:
```typescript
if (destinationCountry === 'CA') {
  zone = 'CANADA_ONLY'
} else if (travelingThroughUS === 'yes') {
  zone = 'WORLDWIDE_INCLUDING_USA'  // ← Uses binary yes/no, NOT days
} else {
  zone = 'WORLDWIDE_EXCLUDING_USA'
}
```

## Future Enhancement Possibilities

### 1. **Premium Adjustment Based on US Days**
```typescript
// Example future logic:
if (travelingThroughUS === 'yes' && usTravelDays > 0) {
  // Calculate blended rate
  const usDays = usTravelDays;
  const nonUSDays = coverageLength - usDays;
  
  const usPremium = usDays * WORLDWIDE_INCLUDING_USA_RATE;
  const nonUSPremium = nonUSDays * WORLDWIDE_EXCLUDING_USA_RATE;
  
  totalPremium = usPremium + nonUSPremium;
}
```

### 2. **Policy Restrictions**
- Set maximum US days allowed (e.g., 50% of total trip)
- Different rates for short vs. long US transits

### 3. **Underwriting Requirements**
- Trigger additional questions if US days > threshold
- Require additional documentation for extended US stays

### 4. **Reporting & Analytics**
- Track average US travel days by destination
- Identify high-risk travel patterns
- Premium optimization analysis

## Implementation Checklist for Future Changes

If you decide to use `usTravelDays` in premium calculation:

### Backend Changes
- [ ] Update `PremiumService.calculatePremiumProduct3()`
- [ ] Add validation (usTravelDays ≤ coverageLength)
- [ ] Update rate logic in `calculateSingleTripProduct3()`
- [ ] Add tests for blended rate scenarios

### Frontend Changes
- [ ] Make field **required** when travelingThroughUS = "yes"
- [ ] Add validation (must be > 0 and < coverageLength)
- [ ] Update premium calculation hook
- [ ] Display premium breakdown showing US vs non-US costs

### Documentation
- [ ] Update rate sheets with US day logic
- [ ] Notify underwriting team of changes
- [ ] Update user-facing help text

## Data Queries

### Find policies with US travel
```sql
SELECT 
  policyNumber,
  destination,
  applicantTravelThroughUs,
  usTravelDays,
  covLen,
  premium
FROM "Policy"
WHERE applicantTravelThroughUs = 'yes'
  AND usTravelDays IS NOT NULL
ORDER BY usTravelDays DESC;
```

### Average US travel days
```sql
SELECT 
  AVG(usTravelDays) as avg_us_days,
  COUNT(*) as total_policies
FROM "Policy"
WHERE usTravelDays > 0;
```

## Contact
For questions about implementing US travel days logic:
- **Backend Team**: Review `PremiumService.calculatePremiumProduct3()`
- **Product Team**: Confirm business rules for US travel
- **Underwriting**: Validate rate structure changes

---

**Last Updated**: [Current Date]
**Status**: Informational field - Not used in calculations



# Product 4: Trip Cancellation - Deluxe Option Documentation

## Overview
The **Trip Cancellation - Deluxe Option** for Product 4 (RIMI Canuck Voyage Non-Medical Travel) provides enhanced trip cancellation coverage for an additional premium.

## Premium Calculation

### Base Premium
- Premium is calculated from the rate table based on:
  - **Trip Cost** (Sum Insured: $0 - $30,000)
  - **Traveler Age** (Age bands: 0-59, 60-64, 65-69, 70-74, 75-79, 80-85)

### Deluxe Option Premium
**Fixed percentage increase: +15% of base premium**

### Formula
```typescript
basePremium = lookupFromRateTable(tripCost, ageBand);

if (tripCancellationDeluxe === true) {
  deluxePremium = basePremium * 0.15;
} else {
  deluxePremium = 0;
}

perTravelerPremium = basePremium + deluxePremium;
totalPremium = perTravelerPremium * numberOfTravelers;
finalPremium = Math.ceil(totalPremium); // Round up to nearest dollar
```

---

## Example Calculations

### Example 1: Single Traveler, No Deluxe
- **Age:** 35 (band 0-59)
- **Trip Cost:** $5,000
- **Base Premium:** $403
- **Deluxe Premium:** $0
- **Total:** **$403 CAD**

### Example 2: Single Traveler, WITH Deluxe
- **Age:** 35 (band 0-59)
- **Trip Cost:** $5,000
- **Base Premium:** $403
- **Deluxe Premium:** $403 × 0.15 = $60.45
- **Subtotal:** $463.45
- **Final (ceiling):** **$464 CAD**

### Example 3: Family of 3, WITH Deluxe
- **Ages:** 42, 38, 10 (all in 0-59 band)
- **Trip Cost per person:** $8,250
- **Base Premium per person:** $621.50 (interpolated)
- **Deluxe per person:** $621.50 × 0.15 = $93.23
- **Per person total:** $714.73
- **Total (3 travelers):** $714.73 × 3 = $2,144.19
- **Final (ceiling):** **$2,145 CAD**

---

## Additional Coverage with Deluxe Option

The Deluxe Option covers the following additional trip cancellation risks:

1. ✅ Rail services cancelled due to staff shortages
2. ✅ Pregnancy of immediate family member (after booking date)
3. ✅ Cancellation by insured travel companion (if also insured)
4. ✅ Cancellation of commercial child care services (within 7 days of departure)
5. ✅ Critical illness of cat or dog under 5 years old (within 7 days of departure)
6. ✅ Undue financial hardship of corporation (revenue loss >30%)
7. ✅ Employer-mandated work during scheduled trip
8. ✅ Political unrest, riot, rebellion, or revolution
9. ✅ Adverse weather at destination
10. ✅ Worsening of chronic illness (stable at booking time)
11. ✅ Required attendance at business/board event scheduled after purchase

---

## Implementation Notes

### Backend
- **Service:** `PremiumService.calculatePremiumProduct4()`
- **Location:** `backend/src/premium/premium.service.ts`
- **Deluxe Logic:** Lines where `tripCancellationDeluxe` is checked

### Frontend
- **Component:** `TripInformation.tsx`
- **Hook:** `usePremiumCalculationProduct4.ts`
- **Display:** Dropdown with "Yes (+15% premium)" and "No" options

### Database
- **Field:** `tripCancellationDeluxe` (Boolean)
- **Models:** Quote, Policy
- **Storage:** `true` or `false`

---

## Future Considerations

### Potential Changes (Not Currently Implemented)
1. **Variable Deluxe Pricing**
   - Different percentages based on trip cost tiers
   - Example: 10% for trips under $10k, 15% for $10k-$20k, 20% for $20k+

2. **Age-Based Deluxe Pricing**
   - Higher deluxe percentage for older travelers
   - Example: +10% for ages 0-59, +20% for ages 60+

3. **Separate Deluxe Rate Table**
   - Instead of percentage, use fixed amounts from a table
   - More granular control over deluxe pricing

4. **Dynamic Deluxe Options**
   - Multiple tiers: Basic, Deluxe, Premium
   - Each with different coverage and pricing

---

## How to Modify Deluxe Percentage

If you need to change the 15% deluxe premium:

### Step 1: Update Backend Service
**File:** `backend/src/premium/premium.service.ts`
```typescript
// Find this line:
const deluxePremium = basePremium * 0.15; // 15% increase

// Change to desired percentage:
const deluxePremium = basePremium * 0.20; // 20% increase
```

### Step 2: Update Frontend Display
**File:** `src/components/products/canuck-voyage-non-medical/step1/TripInformation.tsx`
```typescript
// Find this line:
Yes (+15% premium)

// Change to:
Yes (+20% premium)
```

### Step 3: Update This Documentation
Update all examples in this README with the new percentage.

---

## Testing

### Test Cases

**Test 1: Deluxe Option Disabled**
```typescript
Input: { tripCost: 1000, age: 30, tripCancellationDeluxe: false }
Expected: Base premium only (no deluxe charge)
```

**Test 2: Deluxe Option Enabled**
```typescript
Input: { tripCost: 1000, age: 30, tripCancellationDeluxe: true }
Expected: Base premium + 15% deluxe charge
```

**Test 3: Multiple Travelers with Deluxe**
```typescript
Input: { 
  tripCost: 5000, 
  numberOfTravelers: 4, 
  tripCancellationDeluxe: true 
}
Expected: (Base + Deluxe) × 4 travelers, rounded up
```

---

## Contact
For questions about the Deluxe Option implementation:
- **Backend Team:** Review `PremiumService.calculatePremiumProduct4()`
- **Product Team:** Confirm deluxe percentage and coverage details
- **Underwriting:** Validate additional risks covered

---

**Last Updated:** [Current Date]  
**Deluxe Premium:** Fixed 15% of base premium  
**Status:** Implemented and Active