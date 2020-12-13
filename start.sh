#!/bin/bash

./kind create cluster --name infra --config cluster.yaml

kubectl cluster-info --context kind-infra

sleep 2

# nginx
kubectl apply -f _cluster/nginx.yaml

echo "Waiting for ingress to setup"
sleep 60
echo "Ingress is ok, continue..."

# argocd
kubectl create namespace moleculer
kubectl create namespace argocd
kubectl apply -n argocd -f _cluster/argocd.yaml
kubectl apply -n argocd -f _cluster/argocd-ingress.yaml
