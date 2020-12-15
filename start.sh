#!/bin/bash

# kind
./kind create cluster --name infra --config cluster.yaml
kubectl cluster-info --context kind-infra

sleep 10

# metallb
kubectl create namespace metallb
helm dependency update cluster/metallb
helm upgrade --namespace metallb --install metallb cluster/metallb

sleep 10

exit 0

# argocd
kubectl create namespace argocd
helm dependency update cluster/argocd
helm upgrade -n argocd --install argocd cluster/argocd

sleep 10

kubectl get pods -n argocd -l app.kubernetes.io/name=argocd-server -o name | cut -d'/' -f 2
