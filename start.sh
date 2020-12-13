#!/bin/bash

./kind create cluster --name infra --config cluster.yaml

kubectl cluster-info --context kind-infra

sleep 2

# nginx
kubectl apply -f _charts/nginx.yaml

echo "Waiting for ingress to setup"
sleep 60
echo "Ingress is ok, continue..."

# argocd
kubectl create namespace moleculer
kubectl create namespace argocd
kubectl apply -n argocd -f _charts/argocd.yaml
kubectl apply -n argocd -f _charts/argocd-ingress.yaml
