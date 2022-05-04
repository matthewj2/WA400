# %%
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn import metrics
import pickle

# %% [markdown]
# 1. Reading and preparing the data 

# %%
weather = pd.read_csv("weather1.csv", index_col="DATE")

# %%
weather

# %%
#This will identify all the null in each column and the percentages

weather.apply(pd.isnull).sum()/weather.shape[0]

# %%
#Selecting the important column from the dataset and renaming them

core_weather = weather[["TMAX", "TMIN"]].copy()
core_weather.columns = ["temp_max", "temp_min"]

# %%
core_weather

# %%
core_weather[pd.isnull(core_weather["temp_min"])]

# %%
core_weather = core_weather.fillna(method="ffill")

# %%
core_weather.apply(pd.isnull).sum()/core_weather.shape[0]

# %% [markdown]
# 2. Verifying the correct data types

# %%
#checking the type of data type

core_weather.dtypes

# %%
core_weather.index

# %%
#turning index to date time type
core_weather.index = pd.to_datetime(core_weather.index)

# %%
core_weather.index

# %%
#Check for missing value defined in data documentation
core_weather.apply(lambda x: (x == 9999).sum())

# %% [markdown]
# 3. Analyzing the data

# %%
core_weather[["temp_max", "temp_min"]].plot()

# %% [markdown]
# 4. Figuring out what to predict. 
#    In this example we are trying to predict the next day's max temperature.

# %%
#Creating a target, shift(-1) will pull every row back one position

core_weather["target"] = core_weather.shift(-1)["temp_max"]

# %%
#This shows another column created for target 

core_weather

# %%
#This will delete the last row that shows NA

core_weather = core_weather.iloc[:-1,:].copy()

# %%
#This is to make sure the row got deleted

core_weather

# %% [markdown]
# 5. Preparing to train the data

# %%
X = core_weather['temp_min'].values.reshape(-1,1)
y = core_weather['temp_max'].values.reshape(-1,1)

#Spliting the data into 70% training and 30% testing set

X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.4, random_state=42)

# %%


# %%
#Fitting the Linear Regression

model = LinearRegression()
model.fit(X_train,y_train)

# %%
# Checking the model with intercept and coefficients (slope)
# Print the intercept and coefficients

print('intercept:', model.intercept_)
print('slope:', model.coef_)

# %% [markdown]
# 6. Predicting the Test set results

# %%
y_pred = model.predict(X_test)

# %%
# Printing the prediction results

df_temp = pd.DataFrame({'Actual Temp': y_test.flatten(), 'Predicted Temp': y_pred.flatten()})
df_temp

# %% [markdown]
# 7. Visualizing the results

# %%
#Comparing the actual temp and predicted temp using line graph

df1 = df_temp.head(25)
df1.plot(kind='line', figsize=(16,10))
plt.grid(which='major', linestyle='-',linewidth='0.5', color='green')
plt.grid(which='minor', linestyle=':',linewidth='0.5', color='black')
plt.show()

# %%
#Drawing the regression line on the Test set

plt.scatter(X_test, y_test,  color='green')
plt.plot(X_test, y_pred, color='red', linewidth=2)
plt.title('Regression - Test Set')
plt.show()

# %% [markdown]
# Scatter plot graph between X_test and y_test datasets and we draw a regression line.The straight red line shows our algorithm is correct. Our model looks like a good fit for this data.

# %%
#Drawing regression line on the Train Set

plt.scatter(X_train, y_train,  color='blue')
plt.plot(X_test, y_pred, color='red', linewidth=2)
plt.title('Regression - Train Set')
plt.show()

# %% [markdown]
# Scatter plot graph between X_train and y_train datasets and we draw a regression line.The straight red line shows our algorithm is correct.

# %% [markdown]
# 8. Evaluation metrics 

# %%
# Calculating coefficients
print('Coefficients: \n', model.coef_)

# Calculating mean absolute error
print('Mean Absolute Error:', metrics.mean_absolute_error(y_test, y_pred))

# Calculating mean squared error
print('Mean Squared Error:', metrics.mean_squared_error(y_test, y_pred)) 

# Calculating root mean squared error
print('Root Mean Squared Error:', np.sqrt(metrics.mean_squared_error(y_test, y_pred)))

# Calculating R-squared (or coefficient of determinationnote. 1 is a perfect prediction.
print('Coefficient of Determination:', metrics.r2_score(y_test, y_pred))

# %% [markdown]
# RESULTS:
# 
# - The MSE is the average of the square of the prediction errors. The larger the number, the larger is the error. We can see that the error is 26.77, so it is high. But there is not a correct value for the MSE. Of course, the lower the error, the better, and zero means the model is perfect. Since there is no correct answer, we cannot conclude that our prediction model is incorrect.
# 
# - The RMSE is the error rate by the square root of MSE. We can see that the RMSE is 5.17, which is about less than 15% of the 'mean' value of the percentage of all the temperature. This means the algorithm did a decent job. It has made a fairly good prediction.
# 
# - The MAE is the difference between the original and predicted values extracted by the averaged absolute difference over the data. We can see that it is 4.07, and it is slightly smaller than the RMSE.
# 
# - The Coefficient of Determination is about 90%, which is good. The higher the value the better is the model
# 

# %%
#training
print('R^2 of Training:', metrics.r2_score(X_train, y_train))
#Testing
print('R^2 of Testing:', metrics.r2_score(X_test, y_test))

# Calculating root mean squared error (training)
print('Root Mean Squared Error (Training):', np.sqrt(metrics.mean_squared_error(X_train, y_train)))
# Calculating root mean squared error (Testing)
print('Root Mean Squared Error (Testing):', np.sqrt(metrics.mean_squared_error(X_test, y_test)))

# Calculating mean squared error (training)
print('Mean Squared Error (Training):', metrics.mean_squared_error(X_train, y_train))
# Calculating mean squared error (testing)
print('Mean Squared Error (Testing):', metrics.mean_squared_error(X_test, y_test))

# Calculating mean absolute error (training)
print('Mean Absolute Error:', metrics.mean_absolute_error(X_train, y_train))
# Calculating mean absolute error (testing)
print('Mean Absolute Error:', metrics.mean_absolute_error(X_test, y_test))

# Calculating max error (training)
print('Max Error:', metrics.max_error(X_train, y_train))
# Calculating max error (testing)
print('Max Error:', metrics.max_error(X_test, y_test))

# %%
from sklearn.metrics import mean_squared_error as mse

y_pred = model.predict(X_test)
print("Mean Squared Error on Training Data --> {}\nMean Squared Error on Test Data --> {}".format(mse(y_train, model.predict(X_train)), mse(y_test, y_pred)))

# %%
#print(test)
print(y_pred)
for x in y_pred:
    if x >= 100:
        print("Mostly Sunny")
    elif x >= 90 and x <= 99:
        print("Sunny")
    elif x >= 76 and x < 90:
        print("Partly Cloudy")
    elif x >= 56 and x < 75:
        print("Cloudy")
    elif x >= 55:
        print("Snow showers")
    else:
        print("f")

# %%
#ignore
x_train = []
y_train = []
x_test = []
y_test = []

# Setting 'n_future' days to predict using 'n_past'days. 
n_future = 1.5
n_past = 10

# Getting number of hours 
n_future = int(n_future * 24)
n_past = int(n_past * 24) 

for i in range(0,len(X_train)-n_past-n_future+1):
    x_train.append(X_train[i : i + n_past , 0])     
    y_train.append(X_train[i + n_past : i + n_past + n_future , 0 ])
for i in range(0,len(y_test)-n_past-n_future+1):
    x_test.append(y_test[i : i + n_past , 0])  
    y_test.append(y_test[i + n_past : i + n_past + n_future , 0 ])

x_train, y_train, x_test, y_test = np.array(x_train), np.array(y_train), np.array(x_test), np.array(y_test)


# %%
#ignore
print("Training data:")
print("x_train: ", x_train.shape)
print("y_train: ", y_train.shape)
print("x_test: ", x_test.shape)
print("y_test: ", y_test.shape)

# %%
#ignore
plt_test = []
plt_pred = []

for i in range(12):
    plt_test.append(y_train[1239+36*i])
    plt_pred.append(y_pred[1333+36*i])

plt_test = np.concatenate(plt_test).ravel()
plt_pred = np.concatenate(plt_pred).ravel()


# %%
#ignore
plt.figure(figsize=(15, 5))
plt.plot(plt_test, label='true')
plt.plot(plt_pred, label='pred')
plt.ylabel('temperature')
plt.title('Temperature over a random 36 days period')
plt.legend()
plt.show

# %% [markdown]
# From the above performance measure, we got the mean squared errors on training and test data 27.26 and 26.7.
# This shows the mean squared errors are closer between test and train datasets. All in all the model is not overfitting the data.

# %%
with open ('forecast_model.pkl', "wb") as f:
    pickle.dump(model, f)

# %%
del model

# %%
with open('forecast_model.pkl', "rb") as f:
    model = pickle.load(f)

# %%
model

# %%
y_pred = model.predict(X_test)
df_temp = pd.DataFrame({'Actual Temp': y_test.flatten(), 'Predicted Temp': y_pred.flatten()})
df_temp


