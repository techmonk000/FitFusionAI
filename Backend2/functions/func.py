import pandas as pd
from termcolor import colored
import io
import requests


def calculate_calories_from_user_input(weight, height, age, gender,level,meal,ailments,allergy):
    p='https://raw.githubusercontent.com/RajBhattacharyya/fitfusion/master/backend2/functions/Calorie_value.csv'
    q='https://raw.githubusercontent.com/RajBhattacharyya/fitfusion/master/backend2/functions/final_diseases.csv'
    r='https://raw.githubusercontent.com/RajBhattacharyya/fitfusion/master/backend2/functions/final_food_items.csv'

    s=requests.get(p).content
    df= pd.read_csv(io.StringIO(s.decode('utf-8')))

    t=requests.get(q).content
    df1= pd.read_csv(io.StringIO(t.decode('utf-8')))

    u=requests.get(r).content
    df2= pd.read_csv(io.StringIO(u.decode('utf-8')))
    calories=0
    bmr=0
    def calculate_bmr(weight, height, age, gender):
        if gender == 'male':
            return 10 * weight + 6.25 * height - 5 * age + 5
        elif gender == 'female':
            return 10 * weight + 6.25 * height - 5 * age - 161
        else:
            print('Invalid gender')
            return None

    def get_pal(activity_level):
        if activity_level == 'sedentary':
            return 1.2
        elif activity_level == 'lightly active':
            return 1.375
        elif activity_level == 'moderately active':
            return 1.55
        elif activity_level == 'very active':
            return 1.725
        elif activity_level == 'extra active':
            return 1.9
        else:
            print('Invalid activity level')
            return None


    print('Select your activity level:')
    print('1. Sedentary (little or no exercise)')
    print('2. Lightly active (light exercise/sports 1-3 days/week)')
    print('3. Moderately active (moderate exercise/sports 3-5 days/week)')
    print('4. Very active (hard exercise/sports 6-7 days/week)')
    print('5. Extra active (very hard exercise/sports or physical job)')


    if 1 <= level <= 5:
        activity_level_mapping = {
            1: 'sedentary',
            2: 'lightly active',
            3: 'moderately active',
            4: 'very active',
            5: 'extra active'
        }
        activity_level = activity_level_mapping[level]

        bmr = calculate_bmr(weight, height, age, gender)
        if bmr is not None:
            print(f'Your basal metabolic rate is: {bmr:.2f} calories')

            pal = get_pal(activity_level)
            if pal is not None:
                calories = bmr * pal
                print(f'Your daily calorie requirement is: {calories:.2f} calories')
                      
    else:
        print('Invalid activity level')





    num_diseases = len(ailments)

    diseases = []
    for i in range(num_diseases):
        disease = ailments[i]
        diseases.append(disease)

    # find nutritional component values for entered diseases in demo_6.csv
    nutritional_components = []
    for disease in diseases:
        row = df1.loc[df1['Disease'] == disease]
        nutritional_components.append(list(row.iloc[:, 1:].values[0]))

    # create a list that contains the final daily intake of each nutritional component for all diseases
    final_list = nutritional_components[0]
    for components in nutritional_components[1:]:
        for i, value in enumerate(components):
            final_list[i] = min(final_list[i], value)

    # create a dictionary to store food items for each nutritional component
    food_items_dict = {}

    # iterate over each nutritional component in the final_list
    for i, component_value in enumerate(final_list):
        
        # get the name of the nutritional component
        component_name = df2.columns[i+1]
        
        # create an empty list to store food items for this nutritional component
        food_items = []
        
        # iterate over each row in demo_7.csv
        for index, row in df2.iterrows():
            
            # get the value of the current nutritional component for this food item
            food_component_value = row[component_name]
            
            # check if the nutritional component value for this food item is within 90% of the required daily intake
            if abs(float(food_component_value) - float(component_value)) / float(component_value) <= 0.90:
                
                # add this food item to the list
                food_items.append(row['food items'])
        
        # add the list of food items for this nutritional component to the dictionary
        food_items_dict[component_name] = food_items

    food_i_list = list(food_items_dict.values())
    food_i_list = sum(food_i_list, [])
    unique_list = list(set(food_i_list))




    if (meal == 'Vegetarian'):
        meal_categories = {
        'Breakfast': ('Breakfast grains', 'Fruits', 'Vegetables', 'Protien', 'Healthy Fats','Breads','Juice','Indian bread','Tea & Coffee'),
        'Lunch': ('Grains', 'Indian bread', 'Vegetables', 'Salads', 'Healthy Fats','Soup','Dairy'),
        'Snacks': ('Tea & Coffee','Sandwich','Nuts & Seeds','Fruits','Beverages','Juice'),
        'Dinner': ('Grains', 'Indian bread', 'Vegetables', 'Salads', 'Healthy Fats','Soup','Dairy')
        }

        # create a dictionary to store food items for each category
        food_items_by_category = {category: [] for category in meal_categories.values()}

        for food_item in unique_list:

            # get the category of the current food item
            category = df.loc[df['food items'] == food_item, 'Category'].values[0]

            # add the food item to the list for the category
            for meal_category, categories in meal_categories.items():
                if category in categories:
                    food_items_by_category.setdefault(meal_category + ': ' + category, []).append(food_item)

        # print the list of food items for each meal category and category
        output_list = []

        for meal_category, categories in meal_categories.items():
            output_list.append(colored(meal_category.title(), 'blue', attrs=['bold']))
            for category in categories:
                key = meal_category + ': ' + category
                if key in food_items_by_category and food_items_by_category[key]:
                    output_list.append('   ' + category + ': ' + ', '.join(food_items_by_category[key]))



                
    elif(meal == 'Non-vegetarian'):
        meal_categories = {
        'Breakfast': ('Breakfast grains', 'Fruits', 'Vegetables','Non-veg Protien','Protien', 'Healthy Fats','Breads','Juice','Indian bread','Tea & Coffee'),
        'Lunch': ('Grains', 'Indian bread', 'Vegetables', 'Salads', 'Healthy Fats','Soup','Dairy','Meat', 'Non-veg Salads','Non-veg Soup'),
        'Snacks': ('Tea & Coffee','Sandwich','Nuts & Seeds','Fruits','Beverages','Juice','Non-veg Sandwich'),
        'Dinner': ('Grains', 'Indian bread', 'Vegetables', 'Salads', 'Healthy Fats','Soup','Dairy','Meat','Non-veg Salads','Non-veg Soup')
        }

        # create a dictionary to store food items for each category
        food_items_by_category = {category: [] for category in meal_categories.values()}

        for food_item in unique_list:

            # get the category of the current food item
            category = df.loc[df['food items'] == food_item, 'Category'].values[0]

            # add the food item to the list for the category
            for meal_category, categories in meal_categories.items():
                if category in categories:
                    food_items_by_category.setdefault(meal_category + ': ' + category, []).append(food_item)

        # print the list of food items for each meal category and category
        output_list = []

        for meal_category, categories in meal_categories.items():
            output_list.append(colored(meal_category.title(), 'blue', attrs=['bold']))
            for category in categories:
                key = meal_category + ': ' + category
                if key in food_items_by_category and food_items_by_category[key]:
                    output_list.append('   ' + category + ': ' + ', '.join(food_items_by_category[key]))

        # Now output_list contains the formatted output


                     
    return([bmr,calories,output_list])


"""calculate_calories_from_user_input(75,75,16,"male",4,"Vegetarian",["Diabetes"],["wheat"])"""
