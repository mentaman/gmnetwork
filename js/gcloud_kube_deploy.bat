gcloud container clusters create gmtest-cluster --zone us-west1-a --machine-type=f1-micro --num-nodes=1 --max-nodes=1
gcloud container clusters get-credentials gmtest-cluster
kubectl run gmtest-cluster --image gcr.io/gmnetwork/node-project3 --port 3002

kubectl expose deployment gmtest-cluster --type "LoadBalancer"

kubectl get service gmtest-cluster
