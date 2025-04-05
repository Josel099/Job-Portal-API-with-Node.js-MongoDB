import pandas as pd
import pickle
from sklearn.preprocessing import LabelEncoder
from sklearn.neighbors import NearestNeighbors
import os

# Define CSV file path
CSV_FILE_PATH = "../exports/data.csv"

# Check if file exists
if not os.path.exists(CSV_FILE_PATH):
    raise FileNotFoundError(f"CSV file not found: {CSV_FILE_PATH}")

# Load data
with open(CSV_FILE_PATH, 'r', encoding='utf-8', errors='ignore') as file:
    raw_data = file.readlines()

# Split data sections
college_data = []
job_data = []
user_data = []
section = None

for line in raw_data:
    line = line.strip()
    if not line:
        continue
    if line.startswith("Colleges Data"):
        section = "college"
        continue
    elif line.startswith("Jobs Data"):
        section = "job"
        continue
    elif line.startswith("Users Data"):
        section = "user"
        continue
    
    if section == "college":
        college_data.append(line)
    elif section == "job":
        job_data.append(line)
    elif section == "user":
        user_data.append(line)

# Convert CSV sections to DataFrames
colleges = pd.DataFrame([x.split(",") for x in college_data])
jobs = pd.DataFrame([x.split(",") for x in job_data])
users = pd.DataFrame([x.split(",") for x in user_data])

# Assign column names (fix this if column order changes)
colleges.columns = ["_id", "name", "location", "mail", "minMarks", "courses"]
jobs.columns = ["_id", "title", "company", "description", "location", "salary", "experience", "skills", "postDate", "requiredDegree", "minMarks", "minAge", "requiredCourse", "mail"]
users.columns = ["_id", "name", "email", "role", "degree", "course", "marks", "age", "plusTwoPercentage", "plusTwoStream"]

# Convert numerical columns
colleges["minMarks"] = pd.to_numeric(colleges["minMarks"], errors="coerce")
jobs["minMarks"] = pd.to_numeric(jobs["minMarks"], errors="coerce")
users["marks"] = pd.to_numeric(users["marks"], errors="coerce")

# Encoding categorical features
encoder = LabelEncoder()

jobs["requiredCourse"] = jobs["requiredCourse"].astype(str).apply(lambda x: x.lower())
colleges["courses"] = colleges["courses"].astype(str).apply(lambda x: x.lower())

jobs["requiredCourse_encoded"] = encoder.fit_transform(jobs["requiredCourse"])
colleges["courses_encoded"] = encoder.fit_transform(colleges["courses"])

# Train KNN models
knn_jobs = NearestNeighbors(n_neighbors=3, metric="euclidean")
knn_jobs.fit(jobs[["minMarks", "requiredCourse_encoded"]])

knn_colleges = NearestNeighbors(n_neighbors=3, metric="euclidean")
knn_colleges.fit(colleges[["minMarks", "courses_encoded"]])

# Save models using Pickle
with open("recommendation_model.pkl", "wb") as file:
    pickle.dump({
        "knn_jobs": knn_jobs,
        "knn_colleges": knn_colleges,
        "encoder": encoder,
        "jobs": jobs,
        "colleges": colleges
    }, file)

print("✅ Model training complete. Model saved as 'recommendation_model.pkl'.")